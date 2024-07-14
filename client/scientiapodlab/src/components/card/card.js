import { Typography } from "@mui/material";
import styles from "./card.module.css";
import TemplateSequence from "../templateSequence/templateSequence";
import AudioWave from "../audioWave/audioWave";

function Card({ type, size = "medium", data }) {
  return (
    <div
      className={`${styles.card} ${
        type === "template" && styles.template_card
      } ${type === "audio" && styles.audio_card} ${
        type === "episode" && styles.episode_card
      } ${size === "small" && styles.small_card}`}
    >
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        {data.title}
      </Typography>

      <>
        {type === "template" && (
          <div className={styles.template_container}>
            <Typography variant="body2" sx={{ color: "#00000080" }}>
              Duração: {data.duration}
            </Typography>
            <Typography variant="body2" sx={{ color: "#00000080" }}>
              Intro: {data.hasIntro ? "Sim" : "Não"}
            </Typography>
            <Typography variant="body2" sx={{ color: "#00000080" }}>
              Outro: {data.hasOutro ? "Sim" : "Não"}
            </Typography>
            <Typography variant="body2" sx={{ color: "#00000080" }}>
              TTS: {data.hasTTS ? "Sim" : "Não"}
            </Typography>
            <Typography variant="body2" sx={{ color: "#00000080" }}>
              Tipo: {data.type}
            </Typography>
                
            <div className={styles.template_actions}>
              {data.actions.map((item, index) => (
                <div key={index} style={{ backgroundColor: item.background }}>
                  {item.icon}
                </div>
              ))}
            </div>
            <TemplateSequence size="small" template={data.template} />
          </div>
        )}
        {type === "audio" && (
          <div className={styles.audio_container}>
            <AudioWave
              audioFile={data.audioFile}
              showAdditionalControls={false}
            />
          </div>
        )}
        {type === "episode" && <div></div>}
      </>
    </div>
  );
}

export default Card;
