import React, { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RecordPlugin from "wavesurfer.js/dist/plugins/record.esm.js";
import styles from "./audioVoiceRecorder.module.css";
import { Typography } from "@mui/material";
import FloatButton from "../floatButton/floatButton";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StopIcon from "@mui/icons-material/Stop";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: "#2196F3",
  responsive: true,
  height: 250,
  normalize: false,
  backend: "WebAudio",
  barWidth: 6,
  barGap: 6,
  barRadius: 60,
});

const recordPluginOptions = () => ({
  bufferSize: 4096,
  numberOfInputChannels: 1,
  numberOfOutputChannels: 1,
  constraints: {
    video: false,
    audio: true,
  },
  scrollingWaveform: false,
  renderRecordedAudio: false,
});

function AudioVoiceRecorder({ onEnd, onClose }) {
  const waveFormRef = useRef(null);
  const waveSurfer = useRef(null);
  const record = useRef(null);

  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(false);

  useEffect(() => {
    if (!waveSurfer.current) {
      const options = formWaveSurferOptions(waveFormRef.current);
      waveSurfer.current = WaveSurfer.create(options);

      const recordOptions = recordPluginOptions();
      record.current = waveSurfer.current.registerPlugin(
        RecordPlugin.create(recordOptions)
      );

      record.current.on("record-progress", (time) => {
        const formattedTime = updateProgress(time);
        setCurrentTime(formattedTime);
      });

      record.current.on("record-end", (blob) => {
        if (waveSurfer.current && record.current) {
          waveSurfer.current.destroy();
          waveSurfer.current = null;

          record.current.unAll();
          record.current.destroy();
          record.current = null;
        }

        onEnd(blob);
      });
    }
  }, [onEnd]);

  const updateProgress = (time) => {
    // time will be in milliseconds, convert it to mm:ss format
    const formattedTime = [
      Math.floor((time % 3600000) / 60000), // minutes
      Math.floor((time % 60000) / 1000), // seconds
    ]
      .map((v) => (v < 10 ? "0" + v : v))
      .join(":");

    return formattedTime;
  };

  const startRecording = () => {
    setIsRecording(true);

    if (isPaused) {
      record.current.resumeRecording();
    } else {
      record.current.startRecording();
    }

    setIsPaused(false);
  };

  const pauseRecording = () => {
    setIsPaused(true);
    setIsRecording(false);
    record.current.pauseRecording();
  };

  const stopRecording = () => {
    setIsPaused(false);
    setIsRecording(false);

    record.current.stopRecording();
  };

  return (
    <>
      <div className="overlay"></div>
      <div className={styles.close} onClick={onClose}>
        <CloseIcon sx={{ color: "#fff", fontSize: "64px" }} />
      </div>
      <div className={styles.recorder_container}>
        <Typography variant="h2" sx={{ color: "#fff", fontWeight: 700 }}>
          {currentTime}
        </Typography>
        <div id="waveform" ref={waveFormRef} style={{ width: "100%" }}></div>
        <div className={styles.recorder_buttons}>
          {!isRecording ? (
            <>
              {!isPaused ? (
                <FloatButton
                  icon={
                    <FiberManualRecordIcon
                      sx={{ color: "#FF0000", fontSize: "48px" }}
                    />
                  }
                  onButtonClick={startRecording}
                />
              ) : (
                <>
                  <FloatButton
                    icon={
                      <PlayArrowIcon sx={{ color: "#000", fontSize: "48px" }} />
                    }
                    onButtonClick={startRecording}
                  />
                  <FloatButton
                    icon={
                      <StopIcon sx={{ color: "#8B0000", fontSize: "48px" }} />
                    }
                    onButtonClick={stopRecording}
                  />
                </>
              )}
            </>
          ) : (
            <>
              <FloatButton
                icon={<PauseIcon sx={{ color: "#000", fontSize: "48px" }} />}
                onButtonClick={pauseRecording}
              />
              <FloatButton
                icon={<StopIcon sx={{ color: "#8B0000", fontSize: "48px" }} />}
                onButtonClick={stopRecording}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AudioVoiceRecorder;
