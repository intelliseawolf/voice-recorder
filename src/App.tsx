import React, { useState, useEffect, useRef, useCallback } from "react";
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
  const [recordData, setRecordData] = useState<HTMLAudioElement | null>(null);
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
  } = useAudioRecorder();

  function playAudio() {
    if (recordData) recordData.play();
  }

  useEffect(() => {
    if (recordingBlob) {
      const audio = document.createElement("audio");
      audio.src = URL.createObjectURL(recordingBlob);
      audio.controls = true;
      setRecordData(audio);
    }
  }, [recordingBlob]);

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
        <Button onClick={playAudio}>Play audio</Button>
      </div>
      <WebcamCapture />
    </div>
  );
};

export default App;
