import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Webcam from "react-webcam";
import { Button } from "react-bootstrap";
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
      <Button onClick={capture}>Capture photo</Button>
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
            <Button onClick={togglePauseResume}>resume</Button>
          ) : (
            <Button onClick={togglePauseResume}>pause</Button>
          )}
          <Button onClick={stopRecording}>stop</Button>
        </>
      ) : (
        <Button onClick={startRecording}>play</Button>
      )}
      <audio src={audioSrc} controls></audio>
      <WebcamCapture />
    </div>
  );
};

export default App;
