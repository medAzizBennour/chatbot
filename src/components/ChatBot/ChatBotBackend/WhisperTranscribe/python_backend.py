from flask_cors import CORS
import os
import tempfile
import flask
import json
import aiohttp
import openai
import whisper
import sample_config as config
from flask_socketio import SocketIO
import secrets
import requests
import gpt_backend as gpt



openai.api_key = config.OPENAI_API_KEY
model = "davinci:ft-personal-2023-03-29-12-07-15"
audio_model = whisper.load_model("base")
rasa_url=config.RASA_URL

app = flask.Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = secrets.token_hex(16)
socketio = SocketIO(app, cors_allowed_origins='*')


intents=["greet","goodbye","place_order","search","filter","navigate","stock_price","bot_challenge","thank","help","inform_stock","inform_page"]

emittedFilterData={}
order_data={}

def handle_command (message):
    global emittedFilterData
    global order_data
    headers = {'Content-Type': 'application/json'}
    data = json.dumps({'sender': 'test', 'message': message})
# send the request to the endpoint and receive the response
    response =requests.post(rasa_url, headers=headers, data=data)
    response_json = response.json()
    # Extracting the JSON payload from the text field
    json_payload = response_json[0]['text']
# Parsing the JSON payload into a dictionary
    payload_dict = json.loads(json_payload)
# Extracting the intent, entities, and response message
    intent = payload_dict['intent']
    print(intent)
    if intent not in intents:
        response_message=gpt.GptMessage(message)
        socketio.emit('response-text', response_message,namespace="/chatbot")
    else:
        response_message = payload_dict['response']
        socketio.emit('response-text', response_message,namespace="/chatbot")
        if intent=='help':
            socketio.emit('response', {'data': {'action': 'navigate', 'entities': {'page': 'help'}}},namespace='/navigate')
        elif 'entities' in payload_dict:
            entities = payload_dict['entities']
            response_dict = {
            "data": { "action": intent,"entities":entities }   
        }
            if intent=='filter':
                emittedFilterData=response_dict
                
                filtered_obj=response_dict['data']['entities']['filtered_obj']
                
                response_dict={'data': {'action': 'navigate', 'entities': {'page': filtered_obj}}}
                socketio.emit('response', response_dict,namespace='/navigate')
                socketio.emit('response', emittedFilterData,namespace='/filter')

            else:                    
                if intent == 'place_order' or intent == 'inform_stock':
                    namespace = '/place_order'
                    order_data = response_dict
                elif intent == 'navigate' or intent == 'inform_page':
                    namespace = '/navigate'
                else:
                    namespace='/'+intent
                socketio.emit('response', response_dict,namespace=namespace)
                print(response_dict)
            
            

#------------------USING THE WHISPER MODEL---------------
# @socketio.on('audio-file')
# def handle_transcribe(data):
#     temp_dir = tempfile.mkdtemp()
#     save_path = os.path.join(temp_dir, 'temp.wav')
#     with open(save_path, 'wb') as f:
#         f.write(data)

#     result = audio_model.transcribe(save_path, fp16=False, language='english')
#     print("resuuults",result)

#     if result['segments'][0]['no_speech_prob']<0.5:
#         print(result)
#         command = result['text']
#         print('commmaaand',command)
#         socketio.emit('transcription_result', command)

@socketio.on('connect',namespace="/buy_stock")
def handle_connect():
    print("place order Connected")


@socketio.on('disconnect',namespace="/buy_stock")
def handle_disconnect():
    print("place order disconnected")

@socketio.on('connect',namespace="/navigate")
def handle_connect():
    print("Navigate Connected")


@socketio.on('disconnect',namespace="/navigate")
def handle_disconnect():
    print("Navigate disconnected")

@socketio.on('connect',namespace="/filter")
def handle_connect():
    print("Filter Connected")

@socketio.on('blotter-loaded',namespace='/filter')
def handle_filter():
    global emittedFilterData
    if emittedFilterData:
        socketio.emit('response', emittedFilterData,namespace='/filter')
        emittedFilterData={}


@socketio.on('disconnect',namespace="/filter")
def handle_disconnect():
        print("Filter Disconnected")


@socketio.on('connect',namespace="/search")
def handle_connect():
    print("Search Connected")


@socketio.on('disconnect',namespace="/search")
def handle_disconnect():
    print("Search Disconnected")

@socketio.on('connect',namespace="/place_order")
def handle_connect():
    print("place_order Connected")
@socketio.on('disconnect',namespace="/place_order")
def handle_disconnect():
    print("place_order disconnected")
@socketio.on('connect',namespace="/place_order_data")
def handle_connect():
    print('SENDING ', order_data)
    socketio.emit('response',order_data,namespace='/place_order_data')
@socketio.on('disconnect',namespace="/place_order_data")
def handle_disconnect():
    print("Buy disconnected")


@socketio.on('audio-file',namespace="/chatbot")
def handle_transcribe(data):
    temp_dir = tempfile.mkdtemp()
    save_path = os.path.join(temp_dir, 'temp.wav')
    with open(save_path, 'wb') as f:
        f.write(data)

    audio_file= open(save_path, "rb")

    # result = audio_model.transcribe(save_path, fp16=False, language='english')
    print(save_path)
    result=openai.Audio.transcribe("whisper-1", audio_file,language='EN')
    print("resuuults",result.text)
    command=result.text
    socketio.emit('transcription_result', command,namespace="/chatbot")
    handle_command(command)


@socketio.on('helper',namespace="/chatbot")
def helper_modal(data):
    print(data)
    socketio.emit('helper', data,namespace="/helper")


@socketio.on('text-command',namespace="/chatbot")
def text_command(command):
    handle_command(command)
    

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8000)