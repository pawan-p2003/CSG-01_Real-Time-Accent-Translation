import os
import numpy as np
import pandas as pd
import librosa
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# Function to extract MFCC features from audio files
def extract_features(file_path):
    audio, sample_rate = librosa.load(file_path, sr=None)
    mfccs = librosa.feature.mfcc(y=audio, sr=sample_rate, n_mfcc=13)
    return np.mean(mfccs.T, axis=0)

# Load dataset
def load_data(data_dir):
    features = []
    labels = []
    
    # Load validated data
    validated_data = pd.read_csv(os.path.join(data_dir, 'validated.tsv'), sep='\t')
    
    for index, row in validated_data.iterrows():
        audio_file = os.path.join(data_dir, 'clips', row['path'])
        accent = row['accents']  # Use the 'accents' column for labels
        
        if os.path.isfile(audio_file):
            mfccs = extract_features(audio_file)
            features.append(mfccs)
            labels.append(accent)
    
    return np.array(features), np.array(labels)

# Load data
data_dir = 'data_dir'
X, y = load_data(data_dir)

# Encode labels
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y_encoded, test_size=0.2, random_state=42)

# Define a simple neural network model
model = tf.keras.Sequential([
    tf.keras.layers.Dense(256, activation='relu', input_shape=(X_train.shape[1],)),
    tf.keras.layers.Dropout(0.5),  # Add dropout for regularization
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(len(np.unique(y_encoded)), activation='softmax')
])


model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.001), 
              loss='sparse_categorical_crossentropy', 
              metrics=['accuracy'])

# Train the model
model.fit(X_train, y_train, epochs=20, batch_size=32, validation_data=(X_test, y_test))

# Save the trained model
model.save('path/to/your/trained_model.h5')  # Update this path

# Save the label encoder classes
np.save('path/to/your/classes.npy', label_encoder.classes_)  # Update this path

# Evaluate the model on the test set
loss, accuracy = model.evaluate(X_test, y_test)
print(f'Test Accuracy: {accuracy:.2f}')