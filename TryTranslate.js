import React, { useEffect, useState, useRef } from "react";
import "./trytranslate.css";
import NavBar from "../navbar/NavBar";

const TryTranslate = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isContent, setContent] = useState([]);
  const mediaRecorderRef = useRef(null);

  useEffect(() => {}, []); // You can remove this if not needed

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });
      mediaRecorderRef.current = mediaRecorder;

      const audioChunks = [];
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        await sendToBackend(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const sendToBackend = async (audioBlob) => {
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm");

    try {
      const response = await fetch("http://localhost:5000/process_audio", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const result = await response.json();
      const newContent = { accent: result.accent, text: result.text };

      // Update the state using the functional form to ensure it reflects the latest state
      setContent((prevContent) => [...prevContent, newContent]);
      console.log(result);
    } catch (error) {
      console.error("Error sending audio to backend:", error);
    }
  };

  const renderIndiChats = () => {
    return isContent.map((message, index) => (
      <div key={index} className="indichat">
        <h4>[{index}]</h4>
        <h2>The accent that was detected was {message.accent}</h2>
        <h4>{message.text}</h4>
      </div>
    ));
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="textbox">
          <h3>Here is what you are telling!</h3>
          {renderIndiChats()}
        </div>
        <div className="record">
          <h3>Try it here!</h3> <br />
          <img src="assets/microphone.png" alt="" />
          <button onClick={isRecording ? stopRecording : startRecording}>
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>
          <span>
            <p>
              1. Enable Microphone Access: To start using the accent translation
              feature, please allow microphone access in your browser settings.
              This is essential for recording your voice accurately.
            </p>
            <p>
              2. Start Recording: Click the "Start Recording" button to begin
              capturing your speech. Speak clearly and at a normal pace for the
              best results.
            </p>
            <p>
              3. Stop Recording: When you’re finished speaking, click the "Stop
              Recording" button. Your audio will be processed, and the system
              will analyze your accent.
            </p>
            <p>
              4.View Translation Results: After processing, the detected accent
              and the translated text will appear on the screen. Review the
              results to see how your speech was interpreted.
            </p>
            <p>
              5. Repeat as Needed: If you want to translate more speech, simply
              repeat the process by clicking "Start Recording" again. You can
              continue to add new translations to the chat log.
            </p>
          </span>
        </div>
      </div>
    </>
  );
};

export default TryTranslate;
