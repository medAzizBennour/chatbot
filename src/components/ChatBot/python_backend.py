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
import wave
import base64

app = flask.Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = secrets.token_hex(16)
socketio = SocketIO(app, cors_allowed_origins='*')


audio_model = whisper.load_model("base")

@socketio.on('stream-data')
def handle_stream_data(data):
    audio_data = base64.b64decode(data)
    if len(audio_data) == 0:
        return
    if not hasattr(handle_stream_data, 'audio'):
        print('no audio')
        handle_stream_data.audio = []
    handle_stream_data.audio.append(audio_data)
    print('appended')


@socketio.on('stream-end')
def handle_stream_end():
    if not hasattr(handle_stream_data, 'audio'):
        return
    audio_data = b''.join(handle_stream_data.audio)
    handle_stream_data.audio = []
    print('Received audio data:', len(audio_data))

    temp_dir = tempfile.mkdtemp()
    save_path = os.path.join(temp_dir, 'temp.wav')
    with wave.open(save_path, 'wb') as wav_file:
        wav_file.setnchannels(1)
        wav_file.setsampwidth(2)
        wav_file.setframerate(16000)
        wav_file.writeframes(audio_data)

    print('Saved audio to:', save_path)

    audio = whisper.load_audio(save_path)
    audio = whisper.pad_or_trim(audio)
    mel = whisper.log_mel_spectrogram(audio).to(audio_model.device)
    options = whisper.DecodingOptions(language='en', fp16=False)
    result = whisper.decode(audio_model, mel, options)

    if result.no_speech_prob < 0.5:
        print('Transcription:', result.text)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8000)

# openai.api_key = "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"
# model = "medium"
# model = "davinci:ft-personal-2023-03-29-12-07-15"
    # result = audio_model.transcribe(save_path, fp16=False, language='english')
    # command = result['text']
    # print("Transcription result:", result)

    # prompt = f"{command}->"
    # response = openai.Completion.create(
    #     # model=model,
    #     prompt=prompt,
    #     temperature=1,
    #     max_tokens=256,
    #     top_p=1,
    #     frequency_penalty=0,
    #     presence_penalty=1
    # )
    # js = response['choices'][0]['text'].strip().split('\n', 1)[0]
    # print(js)
    # js_obj = json.dumps(js, ensure_ascii=False)
    # response_data = ast.literal_eval(js_obj)
    # emit_data = {"transcribed_text": result['text'], "response": response_data}
    # socketio.emit('transcription_result', emit_data)