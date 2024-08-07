import React, { useEffect, useRef, useState } from "react";
import FloatButton from "../floatButton/floatButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import WaveSurfer from "wavesurfer.js";
import { Slider, Typography, IconButton } from "@mui/material";
import { formatAudioTime } from "../../lib/utils/formatAudioTime";

const formWaveSurferOptions = (ref, height) => ({
  container: ref,
  waveColor: "#e6f2ff",
  progressColor: "#0178ff",
  cursorColor: "#013c80",
  cursorWidth: 2,
  responsive: true,
  height,
  normalize: true,
  backend: "WebAudio",
  barWidth: 4,
  barGap: 4,
  barRadius: 30,
  dragToSeek: true,
  autoCenter: true,
});

function AudioWave({
  audioFile,
  showAdditionalControls = true,
  size = "medium",
}) {
  const waveFormRef = useRef(null);
  const waveSurfer = useRef(null);
  const hasMounted = useRef(false); // New ref to track mount status

  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const options = formWaveSurferOptions(
      waveFormRef.current,
      size === "large" ? 150 : size === "medium" ? 100 : 50
    );
    waveSurfer.current = WaveSurfer.create(options);

    waveSurfer.current.load(new URL(audioFile).href);

    waveSurfer.current.on("ready", () => {
      setVolume(waveSurfer.current.getVolume());
      setDuration(waveSurfer.current.getDuration());
    });

    waveSurfer.current.on("audioprocess", () => {
      setCurrentTime(waveSurfer.current.getCurrentTime());
    });

    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    return () => {
      if (waveSurfer.current) {
        waveSurfer.current.un("audioprocess");
        waveSurfer.current.un("ready");
        waveSurfer.current.destroy();
        waveSurfer.current = null;
      }
    };
  }, [audioFile, size]);

  const handlePlayPause = () => {
    setPlaying(!playing);
    waveSurfer.current.playPause();
  };

  const handleVolumeChange = (event, newVolume) => {
    setVolume(newVolume);
    waveSurfer.current.setVolume(newVolume);
    setMuted(newVolume === 0);
  };

  const handleMute = () => {
    setMuted(!muted);
    waveSurfer.current.setVolume(muted ? volume : 0);
  };

  return (
    <div style={{ width: "100%" }}>
      <div id="waveform" ref={waveFormRef} style={{ width: "100%" }}></div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
          width: "100%",
        }}
      >
        <FloatButton
          size={size === "medium" ? "medium" : "small"}
          icon={
            playing ? (
              <PauseIcon fontSize={size === "medium" ? "medium" : "small"} />
            ) : (
              <PlayArrowIcon
                fontSize={size === "medium" ? "medium" : "small"}
              />
            )
          }
          onButtonClick={handlePlayPause}
        />
        {showAdditionalControls && (
          <>
            <Typography variant="caption" style={{ marginLeft: 10 }}>
              {formatAudioTime(currentTime)} / {formatAudioTime(duration)}
            </Typography>
            <Slider
              value={volume}
              onChange={handleVolumeChange}
              min={0}
              max={1}
              step={0.01}
              style={{ width: 100, marginLeft: 24, marginRight: 10 }}
            />
            <IconButton onClick={handleMute}>
              {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </IconButton>
          </>
        )}
      </div>
    </div>
  );
}

export default AudioWave;
