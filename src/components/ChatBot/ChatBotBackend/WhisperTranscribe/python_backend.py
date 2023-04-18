from flask_cors import CORS
import os
import tempfile
import flask
import json
import openai
import whisper
import sample_config as config
from flask_socketio import SocketIO
import secrets
import requests
import websocket

openai.api_key = config.OPENAI_API_KEY
model = "davinci:ft-personal-2023-03-29-12-07-15"
audio_model = whisper.load_model("base")
rasa_url=config.RASA_URL

app = flask.Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = secrets.token_hex(16)
socketio = SocketIO(app, cors_allowed_origins='*')
# Create WebSocket client to connect to Node.js server
# ws = websocket.create_connection("ws://localhost:4000")

def handle_command (message):
    headers = {'Content-Type': 'application/json'}
    data = json.dumps({'sender': 'test', 'message': message})

# send the request to the endpoint and receive the response
    response = requests.post(rasa_url, headers=headers, data=data)
    print("Responseeeeeeeeee" ,response)
    response_json = response.json()
    print(response_json)
    # Extracting the JSON payload from the text field
    json_payload = response_json[0]['text']

# Parsing the JSON payload into a dictionary
    payload_dict = json.loads(json_payload)
    response_message = payload_dict['response']
    socketio.emit('response-text', response_message)

# Extracting the intent, entities, and response message
    intent = payload_dict['intent']
    entities = payload_dict['entities']


    print(response_json)

    response_dict = {
        "type":"message",
        "data": { "action": intent, "parameters": entities }
    }

    # Return the JSON as a response
    return response_dict

@socketio.on('audio-file')
def handle_transcribe(data):
    temp_dir = tempfile.mkdtemp()
    save_path = os.path.join(temp_dir, 'temp.wav')
    with open(save_path, 'wb') as f:
        f.write(data)

    result = audio_model.transcribe(save_path, fp16=False, language='english')
    print("resuuults",result)

    if result['segments'][0]['no_speech_prob']<0.5:
        print(result)
        command = result['text']
        print('commmaaand',command)
        socketio.emit('transcription_result', command)
        response_obj=handle_command(command)
#         prompt = f"{command}->"
#         response = openai.Completion.create(
#             model=model,
#             prompt=prompt,
#             temperature=1,
#             max_tokens=256,
#             top_p=1,
#             frequency_penalty=0,
#             presence_penalty=1
#         )
# # extract the JSON string from response
#         js = response['choices'][0]['text'].strip().split('\n', 1)[0]
#         print(js)

# # parse the JSON string
#         json_object = json.loads(js.replace("'", "\""))
#         print(json_object)

# emit the JSON object
        socketio.emit('response', response_obj)
        # ws.send(json.dumps(response_obj))


        


@socketio.on('text-command')
def text_command(command):
#     prompt = f"{command}->"
#     response = openai.Completion.create(
#             model=model,
#             prompt=prompt,
#             temperature=1,
#             max_tokens=256,
#             top_p=1,
#             frequency_penalty=0,
#             presence_penalty=1
#         )
# # extract the JSON string from response
#     js = response['choices'][0]['text'].strip().split('\n', 1)[0]
#     print(js)

# # parse the JSON string
#     json_object = json.loads(js.replace("'", "\""))
#     print(json_object)
    response_obj=handle_command(command)

# emit the JSON object
    socketio.emit('response', response_obj)
    # ws.send("command",json.dumps(response_obj))

    
    



if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8000)
