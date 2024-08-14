import React, { useState } from 'react';

const Speech = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);

  const runSpeechRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onspeechend = () => {
      setIsListening(false);
      recognition.stop();
    };

    recognition.onresult = (event) => {
      const { transcript, confidence } = event.results[0][0];
      setTranscript(transcript);
      setConfidence(confidence);
    };

    recognition.start();
  };

  return (
    <div>
      <h2>JavaScript Speech to Text</h2>
      <p>Click on the below button and speak something...</p>
      <button onClick={runSpeechRecognition}>
        {isListening ? 'Listening...' : 'Speech to Text'}
      </button>
      <div>
        {isListening ? <span>listening, please speak...</span> : <span>stopped listening, hope you are done...</span>}
      </div>
      {transcript && (
        <div style={{ marginTop: '20px', backgroundColor: '#F9F9F9', padding: '10px' }}>
          <strong>Text:</strong> {transcript}<br />
          <strong>Confidence:</strong> {(confidence * 100).toFixed(2)}%
        </div>
      )}
    </div>
  );
};

export default Speech;
