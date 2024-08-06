import React, { useEffect, useRef, useState } from "react";
import FloatButton from "../floatButton/floatButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { Typography } from "@mui/material";
import { useAudioPlayer } from "react-use-audio-player";
import { formatAudioTime } from "../../lib/utils/formatAudioTime";

function AudioPlayer({ audioFile, showTime = true, size = "medium", onEnd }) {
  const [currentTime, setCurrentTime] = useState(0);
  const intervalRef = useRef(null);

  const { load, togglePlayPause, playing, duration } = useAudioPlayer();

  useEffect(() => {
    if (audioFile) {
      load(audioFile, {
        format: "mp3",
        autoplay: false,
        onplay: () => {
          intervalRef.current = setInterval(() => {
            setCurrentTime((prevCurrentTime) => prevCurrentTime + 1);
          }, 1000);
        },
        onpause: () => {
          clearInterval(intervalRef.current);
        },
        onend: () => console.log("onEnd"),
      });
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [audioFile, load]);

  return (
    <>
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
          onButtonClick={togglePlayPause}
        />
        {showTime && (
          <Typography variant="caption" style={{ marginLeft: 10 }}>
            {formatAudioTime(currentTime)} / {formatAudioTime(duration)}
          </Typography>
        )}
      </div>
    </>
  );
}

export default AudioPlayer;
