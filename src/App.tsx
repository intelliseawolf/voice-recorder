import React, {
  useState,
  useMemo,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Webcam from "react-webcam";
import { Button, Modal } from "react-bootstrap";
import "./App.css";

import { useAudioRecorder } from "react-audio-voice-recorder";

const WebcamCapture: React.FC = () => {
  const [show, setShow] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    setImgSrc(imageSrc || null);
  }, [webcamRef, setImgSrc]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={capture}>Capture photo</Button>
        </Modal.Footer>
      </Modal>

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
      <div>
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
      </div>
      <WebcamCapture />
    </div>
  );
};

export default App;
