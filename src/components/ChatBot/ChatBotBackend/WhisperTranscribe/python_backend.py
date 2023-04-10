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

openai.api_key = config.OPENAI_API_KEY
model = "davinci:ft-personal-2023-03-29-12-07-15"
audio_model = whisper.load_model("base")

app = flask.Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = secrets.token_hex(16)
socketio = SocketIO(app, cors_allowed_origins='*')


@socketio.on('audio-file')
def handle_transcribe(data):
    temp_dir = tempfile.mkdtemp()
    save_path = os.path.join(temp_dir, 'temp.wav')
    with open(save_path, 'wb') as f:
        f.write(data)

    result = audio_model.transcribe(save_path, fp16=False, language='english')

    if result['segments'][0]['no_speech_prob']<0.5:
        print(result)
        command = result['text']
        socketio.emit('transcription_result', command)
        prompt = f"{command}->"
        response = openai.Completion.create(
            model=model,
            prompt=prompt,
            temperature=1,
            max_tokens=256,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=1
        )
# extract the JSON string from response
        js = response['choices'][0]['text'].strip().split('\n', 1)[0]
        print(js)

# parse the JSON string
        json_object = json.loads(js.replace("'", "\""))
        print(json_object)

# emit the JSON object
        socketio.emit('response', json_object)


@socketio.on('text-command')
def text_command(command):
    prompt = f"{command}->"
    response = openai.Completion.create(
            model=model,
            prompt=prompt,
            temperature=1,
            max_tokens=256,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=1
        )
# extract the JSON string from response
    js = response['choices'][0]['text'].strip().split('\n', 1)[0]
    print(js)

# parse the JSON string
    json_object = json.loads(js.replace("'", "\""))
    print(json_object)

# emit the JSON object
    socketio.emit('text-response', json_object)




if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8000)
