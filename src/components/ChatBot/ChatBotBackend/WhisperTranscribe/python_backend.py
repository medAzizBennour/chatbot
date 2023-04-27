import json
import os
import secrets
import tempfile
from sanic import Sanic
import requests
import openai
import whisper
import sample_config as config
from sanic_cors import CORS
from socketio import AsyncServer

openai.api_key = config.OPENAI_API_KEY
model = "davinci:ft-personal-2023-03-29-12-07-15"
audio_model = whisper.load_model("base")
rasa_url=config.RASA_URL

app = Sanic(__name__)
CORS(app)
app.config['SECRET_KEY'] = secrets.token_hex(16)

app2 = Sanic('app2')
CORS(app2)
app2.config['SECRET_KEY'] = secrets.token_hex(16)

# Create the two SocketIO instances
transcribe_socket = AsyncServer(async_mode='sanic', cors_allowed_origins='*')
transcribe_socket.attach(app)
command_socket = AsyncServer(async_mode='sanic', cors_allowed_origins='*')
command_socket.attach(app2)

async def handle_command(message, connection):
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

    # Extracting the intent, entities, and response message
    intent = payload_dict['intent']
    entities = payload_dict['entities']

    # Construct the response dict
    response_dict = {
        "type": "message",
        "data": {"action": intent, "parameters": entities}
    }

    # Return the response dict
    return response_dict


@transcribe_socket.on('audio-file')
async def handle_transcribe(data):
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
        # Emit the transcription result on the transcribe socket
        await transcribe_socket.emit('transcription_result', command)
        # Call the handle_command function to handle the command and emit the response on the command socket
        response_obj=await handle_command(command, command_socket.server_connection)
        await command_socket.emit('response', response_obj)


@transcribe_socket.on('text-command')
async def text_command(command):

    response_obj=await handle_command(command, command_socket.server_connection)

# emit the JSON object
    command_socket.emit('response', response_obj)
    # ws.send("command",json.dumps(response_obj))

    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
    app2.run(host='0.0.0.0', port=8001)
