from flask_cors import CORS
import os
import tempfile
import flask
import json
import ast
import openai
import whisper
import sample_config as config
from flask_socketio import SocketIO
import secrets


openai.api_key = "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"
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
    print(result)
    command = result['text']
    prompt = f"{command}->"

    # response = openai.Completion.create(
    #     model=model,
    #     prompt=prompt,
    #     temperature=1,
    #     max_tokens=256,
    #     top_p=1,
    #     frequency_penalty=0,
    #     presence_penalty=1
    # )
    # js = response['choices'][0]['text'].strip().split('\n', 1)[0].replace("\'", "\"")
    # print(js)
    # js_obj = json.dumps(js, ensure_ascii=False)
    # response_data = ast.literal_eval(js_obj)

    emit_data = {"transcribed_text": result['text']
                #  , "response": response_data
                 }
    socketio.emit('transcription_result', emit_data)


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8000)

