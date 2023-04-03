import React, { useState, useMemo, useEffect } from "react";
import "./App.css";

import { useAudioRecorder } from "react-audio-voice-recorder";

const App = () => {
  const [recordData, setRecordData] = useState<Blob | null>(null);
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
  } = useAudioRecorder();

  useEffect(() => {
    if (recordingBlob) setRecordData(recordingBlob);
  }, [recordingBlob]);

  const audioSrc = useMemo(() => {
    console.log("hhehehe");
    if (recordData) return URL.createObjectURL(recordData);
    else return "";
  }, [recordData]);

  console.log("audioSrc", audioSrc);

  return (
    <div className="App">
      {isRecording ? (
        <>
          {isPaused ? (
            <button onClick={togglePauseResume}>resume</button>
          ) : (
            <button onClick={togglePauseResume}>pause</button>
          )}
          <button onClick={stopRecording}>stop</button>
        </>
      ) : (
        <button onClick={startRecording}>play</button>
      )}
      <audio src={audioSrc} controls></audio>
    </div>
  );
};

export default App;
