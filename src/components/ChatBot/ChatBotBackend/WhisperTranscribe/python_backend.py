from flask_cors import CORS
import os
import tempfile
import flask
import json
import openai
import whisper
import sample_config as config
from flask_socketio import SocketIO,join_room,leave_room
import secrets
import requests
import websocket
import gpt_backend as gpt



openai.api_key = config.OPENAI_API_KEY
model = "davinci:ft-personal-2023-03-29-12-07-15"
audio_model = whisper.load_model("base")
rasa_url=config.RASA_URL

app = flask.Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = secrets.token_hex(16)
socketio = SocketIO(app, cors_allowed_origins='*')


intents=["greet","goodbye","buy_stock","sell_stock","search","filter","navigate","stock_price","bot_challenge"]

def handle_command(message):
    headers = {'Content-Type': 'application/json'}
    data = json.dumps({'sender': 'test', 'message': message})
# send the request to the endpoint and receive the response
    response = requests.post(rasa_url, headers=headers, data=data)
    response_json = response.json()
    # Extracting the JSON payload from the text field
    json_payload = response_json[0]['text']
# Parsing the JSON payload into a dictionary
    payload_dict = json.loads(json_payload)
# Extracting the intent, entities, and response message
    intent = payload_dict['intent']
    if intent not in intents:
        response_message=gpt.GptMessage(message)
        socketio.emit('response-text', response_message,namespace="/chatbot")
    else:
        response_message = payload_dict['response']
        socketio.emit('response-text', response_message,namespace="/chatbot")
        if 'entities' in payload_dict:
            entities = payload_dict['entities']
            response_dict = {
            "data": { "action": intent,"entities":entities }
        }
            namespace='/'+intent
            print(response_dict)
            socketio.emit('response', response_dict,namespace=namespace)


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


@socketio.on('connect',namespace="/navigate")
def handle_connect():
    print("Navigate Connected")


@socketio.on('disconnect',namespace="/navigate")
def handle_disconnect():
    print("alo")

@socketio.on('connect',namespace="/filter")
def handle_connect():
    print("Filter Connected")


@socketio.on('disconnect',namespace="/filter")
def handle_disconnect():
    print("alo")
@socketio.on('connect',namespace="/search")
def handle_connect():
    print("Search Connected")


@socketio.on('disconnect',namespace="/search")
def handle_disconnect():
    print("alo")

@socketio.on('audio-file',namespace="/chatbot")
def handle_transcribe(data):
    temp_dir = tempfile.mkdtemp()
    save_path = os.path.join(temp_dir, 'temp.wav')
    with open(save_path, 'wb') as f:
        f.write(data)

    audio_file= open(save_path, "rb")

    # result = audio_model.transcribe(save_path, fp16=False, language='english')
    print(save_path)
    result=openai.Audio.transcribe("whisper-1", audio_file)
    print("resuuults",result.text)
    command=result['text']
    socketio.emit('transcription_result', command,namespace="/chatbot")
    handle_command(command)


@socketio.on('text-command',namespace="/chatbot")
def text_command(command):
    handle_command(command)
    

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8000)