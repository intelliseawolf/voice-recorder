import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Webcam from "react-webcam";
import "./App.css";

import { useAudioRecorder } from "react-audio-voice-recorder";

const WebcamCapture: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setImgSrc(imageSrc || null);
  }, [webcamRef, setImgSrc]);

  return (
    <>
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <button onClick={capture}>Capture photo</button>
      {imgSrc && <img src={imgSrc} alt="captured" />}
    </>
  );
};

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
    if (recordData) return URL.createObjectURL(recordData);
    else return "";
  }, [recordData]);

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
      <WebcamCapture />
    </div>
  );
};

export default App;
