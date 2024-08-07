import { Typography } from "@mui/material";
import styles from "./card.module.css";
import TemplateSequence from "../templateSequence/templateSequence";
import AudioWave from "../audioWave/audioWave";

function Card({ type, size = "medium", data, onClick, isSelected = false }) {
  return (
    <div
      className={`${styles.card} ${
        type === "template" && styles.template_card
      } ${type === "audio" && styles.audio_card} ${
        type === "episode" && styles.episode_card
      } ${size === "small" && styles.small_card} ${
        onClick !== undefined && styles.pointer
      } ${isSelected && styles.selected}`}
      onClick={onClick ? () => onClick() : undefined}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          fontSize: size === "small" ? "12px" : "18px",

          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
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
              {data.actions?.map((item, index) => (
                <>
                  {item && (
                    <div
                      onClick={item.action}
                      key={index}
                      style={{ backgroundColor: item.background }}
                    >
                      {item.icon}
                    </div>
                  )}
                </>
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
              size={size}
            />
            <div className={styles.template_actions}>
              {data.actions?.map((item, index) => (
                <>
                  {item && (
                    <div
                      onClick={item.action}
                      key={index}
                      style={{ backgroundColor: item.background }}
                    >
                      {item.icon}
                    </div>
                  )}
                </>
              ))}
            </div>
          </div>
        )}
        {type === "episode" && <div></div>}
      </>
    </div>
  );
}

export default Card;
