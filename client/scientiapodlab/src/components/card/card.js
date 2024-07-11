import { Typography } from "@mui/material";
import styles from "./card.module.css";
import { TEMPLATE_TYPE } from "../../lib/constants/template";

function Card({ type, size = "medium", data }) {
  return (
    <div
      className={`${styles.card} ${
        type === "template" && styles.template_card
      } ${type === "audio" && styles.audio_card} ${
        type === "episode" && styles.episode_card
      } ${size === "small" && styles.small_card}`}
    >
      <Typography variant="h5">{data.title}</Typography>

      <>
        {type === "template" && (
          <div className={styles.template_container}>
            <Typography variant="body2">Duração: {data.duration}</Typography>
            <Typography variant="body2">Intro: {data.hasIntro}</Typography>
            <Typography variant="body2">Outro: {data.hasOutro}</Typography>
            <Typography variant="body2">TTS: {data.hasTTS}</Typography>
            <Typography variant="body2">Tipo: {data.type}</Typography>

            <div className={styles.template_actions}>
              {data.actions.map((item, index) => (
                <div key={index} style={{ backgroundColor: item.background }}>
                  {item.icon}
                </div>
              ))}
            </div>

            <div
              className={`${styles.template_mini} ${
                size === "small" && styles.template_mini_small
              }}`}
            >
              {data.template.map((item, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: TEMPLATE_TYPE[item].color }}
                >
                  <Typography variant="caption">
                    {TEMPLATE_TYPE[item].label}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        )}
        {type === "audio" && <div></div>}
        {type === "episode" && <div></div>}
      </>
    </div>
  );
}

export default Card;
