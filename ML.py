import numpy as np
import io
from flask import Flask, request, jsonify
import speech_recognition as sr
import tensorflow as tf
from sklearn.preprocessing import LabelEncoder
from pydub import AudioSegment
import wave
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 
app.config['SECRET_KEY'] = 'fd3fa9121ad61fd26b82590fb712f0c3e64ba1a6f123b818'

# Load the pre-trained model and label encoder
model = tf.keras.models.load_model('model/trained_model.h5')  # Update path
label_encoder_classes = np.load('model/classes.npy', allow_pickle=True)
label_encoder = LabelEncoder()
label_encoder.classes_ = label_encoder_classes

def extract_features_from_audio(audio_data, sample_rate=16000):
    """Extract MFCC features from audio data."""
    import librosa
    mfccs = librosa.feature.mfcc(y=audio_data, sr=sample_rate, n_mfcc=13)
    return np.mean(mfccs.T, axis=0)

def recognize_accent(audio_data, sample_rate):
    """Predict the accent from audio data."""
    mfcc_features = extract_features_from_audio(audio_data, sample_rate)
    mfcc_features = mfcc_features.reshape(1, -1)  # Reshape for model input
    prediction = model.predict(mfcc_features)
    predicted_class = np.argmax(prediction, axis=1)
    accent = label_encoder.inverse_transform(predicted_class)
    return accent[0]

@app.route('/process_audio', methods=['POST'])
def process_audio():
    try:
        # Check if an audio file is in the request
        if 'audio' not in request.files:
            return jsonify({'error': 'No audio file provided'}), 400

        audio_file = request.files['audio']

        # Convert WebM to WAV using pydub
        try:
            webm_audio = AudioSegment.from_file(audio_file, format="webm")
            wav_buffer = io.BytesIO()
            webm_audio.export(wav_buffer, format="wav")
            wav_buffer.seek(0)

            # Decode WAV file
            with wave.open(wav_buffer, 'rb') as wav_file:
                # Extract audio data and properties
                num_channels = wav_file.getnchannels()
                sample_width = wav_file.getsampwidth()
                sample_rate = wav_file.getframerate()
                num_frames = wav_file.getnframes()
                pcm_data = wav_file.readframes(num_frames)
                
                # Convert PCM data to NumPy array
                audio_data = np.frombuffer(pcm_data, dtype=np.int16).astype(np.float32) / 32767.0  # Normalize to [-1, 1]
        except Exception as conversion_error:
            return jsonify({'error': 'Failed to decode WebM audio', 'details': str(conversion_error)}), 400

        # Perform accent detection
        accent = recognize_accent(audio_data, sample_rate)
        # Transcribe the audio using SpeechRecognition
        recognizer = sr.Recognizer()
        wav_buffer.seek(0)  # Reset buffer for SpeechRecognition
        with sr.AudioFile(wav_buffer) as source:
            audio = recognizer.record(source)
            text = recognizer.recognize_google(audio)
            print("error")
        
        # Return results
        return jsonify({'text': text, 'accent': accent})

    except Exception as e:
        print(f"Error processing audio file: {e}")
        return jsonify({'text': '', 'accent': 'Error', 'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
