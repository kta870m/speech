import React, { useState, useEffect } from 'react';

const SpeechRecognitionComponent = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();

    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true; // Keep true if you need real-time results
    recognitionInstance.lang = 'en-US';

    recognitionInstance.onresult = event => {
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          const result = event.results[i][0].transcript;
          setTranscript(prevTranscript => prevTranscript + ' ' + result);
        }
      }
    };

    recognitionInstance.onend = () => {
      if (isListening) {
        recognitionInstance.start();
      }
    };

    setRecognition(recognitionInstance);

    // Cleanup function to stop recognition when component unmounts
    return () => recognitionInstance.stop();
  }, []);

  useEffect(() => {
    if (isListening) {
      recognition?.start();
    } else {
      recognition?.stop();
    }
  }, [isListening, recognition]);

  const toggleListening = () => {
    setIsListening(prevState => !prevState);
    if (!isListening) {
      setTranscript(''); // Clear transcript when starting a new session
    }
  };

  return (
    <div>
      <button onClick={toggleListening}>
        {isListening ? 'Stop' : 'Start'} Listening
      </button>
      <p>{transcript}</p>
    </div>
  );
};

export default SpeechRecognitionComponent;
