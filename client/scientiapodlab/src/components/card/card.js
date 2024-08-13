import { Typography } from "@mui/material";
import styles from "./card.module.css";
import TemplateSequence from "../templateSequence/templateSequence";
import AudioWave from "../audioWave/audioWave";
import AudioPlayer from "../audioPlayer/audioPlayer";
import FloatButton from "../floatButton/floatButton";
import MicIcon from "@mui/icons-material/Mic";
import { useNavigate } from "react-router-dom";

function Card({ type, size = "medium", data, onClick, isSelected = false }) {
  const navigate = useNavigate();

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

          color: type === "episode" ? "#fff" : "#000",
          zIndex: 1,
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
        {type === "episode" && (
          <>
            <img
              src={data.image}
              alt={`Episódio ${data.name} imagem`}
              className={styles.episode_img}
            ></img>
            <div className={styles.episode_container}>
              <Typography
                variant="body2"
                sx={{
                  color: "#ffffff",
                  fontSize: "10px",

                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 4,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  lineHeight: "1.2em", // Adjust line height as needed
                  height: "calc(1.2em * 4)", // 4 lines based on the line height
                }}
              >
                {data.description}
              </Typography>
              <div style={{ color: "#fff" }}>
                {(data.status === "FINISHED" ||
                  data.status === "PUBLISHED") && (
                  <AudioPlayer
                    showTime={true}
                    audioFile={data.url}
                    size="small"
                  />
                )}
              </div>

              {(data.status === "" || data.status === "RECORDING") && (
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
                    size="small"
                    icon={<MicIcon fontSize="small" />}
                    onButtonClick={() => {
                      navigate(
                        `/podcasts/${data.podcastId}/episode/${data.ID}/record`
                      );
                    }}
                  />
                </div>
              )}
            </div>
            <div className={styles.episode_actions}>
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
          </>
        )}
      </>
    </div>
  );
}

export default Card;
