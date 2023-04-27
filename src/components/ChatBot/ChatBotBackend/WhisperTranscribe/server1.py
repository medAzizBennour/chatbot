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


client_namespaces = {}


openai.api_key = config.OPENAI_API_KEY
model = "davinci:ft-personal-2023-03-29-12-07-15"
audio_model = whisper.load_model("base")
rasa_url=config.RASA_URL

app = flask.Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = secrets.token_hex(16)
socketio = SocketIO(app, cors_allowed_origins='*')

intents=["greet","goodbye","buy_stock","sell_stock","search","filter","navigate","stock_price"]

def handle_command(message,namespace):
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
    print("NAMESPACE",namespace)
    if intent not in intents:
        if namespace=='chatbot':
            response_message=gpt.GptMessage(message)
            socketio.emit('response-text', response_message)
    else:
        if namespace=='chatbot':
            response_message = payload_dict['response']
            socketio.emit('response-text', response_message)
        if 'entities' in payload_dict:
            entities = payload_dict['entities']
            response_dict = {
                "data": { "action": intent,"entities":entities }
            }
            return response_dict
        else:
            return {}
        
# # def handle_command (message):
# #     headers = {'Content-Type': 'application/json'}
# #     data = json.dumps({'sender': 'test', 'message': message})

# # # send the request to the endpoint and receive the response
# #     response = requests.post(rasa_url, headers=headers, data=data)
# #     print("Responseeeeeeeeee" ,response)
# #     response_json = response.json()
# #     print(response_json)
# #     # Extracting the JSON payload from the text field
# #     json_payload = response_json[0]['text']

# # # Parsing the JSON payload into a dictionary
# #     payload_dict = json.loads(json_payload)
# #     response_message = payload_dict['response']
# #     socketio.emit('response-text', response_message)

# # # Extracting the intent, entities, and response message
# #     intent = payload_dict['intent']
# #     entities = payload_dict['entities']


#     print(response_json)

#     response_dict = {
#         "type":"message",
#         "data": { "action": intent, "parameters": entities }
#     }

#     # Return the JSON as a response
#     return response_dict


# def handle_command(message):
#     headers = {'Content-Type': 'application/json'}
#     data = json.dumps({'sender': 'test', 'message': message})

# # send the request to the endpoint and receive the response
#     response = requests.post(rasa_url, headers=headers, data=data)
#     response_json = response.json()
#     # Extracting the JSON payload from the text field
#     json_payload = response_json[0]['text']

# # Parsing the JSON payload into a dictionary
#     payload_dict = json.loads(json_payload)
#     print(payload_dict)

# # Extracting the intent, entities, and response message
#     intent = payload_dict['intent']
#     response = payload_dict['response']
#     print('Intent',intent)
#     print('Resoponse ',response)
#     if intent not in intents:
#         response_message=gpt.GptMessage(message)
#         socketio.emit('response-text', response_message)
#     else:
#         if (payload_dict.entities):
#             entities = payload_dict['entities']
#         response_message = payload_dict['response']

#         #emit response message to the chatbot
#         socketio.emit('response-text', response_message)

#         response_dict = {
#         "data": { "action": intent, "parameters": entities }
        
#     }
#         return response_dict  


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

@socketio.on('connect')
def handle_connect():
    # Get the namespace sent from the frontend
    namespace = flask.request.args.get('namespace')
    client_namespaces[flask.request.sid] = namespace
    join_room(namespace)


@socketio.on('disconnect')
def handle_disconnect():
    namespace = client_namespaces.pop(flask.request.sid)
    leave_room(namespace)


@socketio.on('audio-file')
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
    socketio.emit('transcription_result', command)
    response_obj=handle_command(command)

    socketio.emit('response', response_obj)

@socketio.on('text-command')
def text_command(command):
    namespace = client_namespaces.get(flask.request.sid)
    print(namespace)
    if namespace:
            # Emit the response to the client's specific namespace
        response_obj = handle_command(command,namespace)
        socketio.emit('response', response_obj, namespace=namespace)
    

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8000)