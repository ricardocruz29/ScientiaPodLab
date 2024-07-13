import { Typography } from "@mui/material";
import styles from "./templateSequence.module.css";
import { TEMPLATE_TYPE } from "../../lib/constants/template";
import CloseIcon from "@mui/icons-material/Close";
import FloatButton from "../floatButton/floatButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function TemplateSequence({ size = "medium", template, actions }) {
  return (
    <div className={styles.template_sequence}>
      {template.map((item, index) => (
        <div
          key={index}
          className={`${styles.template_sequence_card} ${
            size === "small" && styles.template_sequence_card_small
          }`}
          style={{ backgroundColor: TEMPLATE_TYPE[item.type].color }}
        >
          <Typography
            variant={size === "medium" ? "h6" : "caption"}
            sx={{ color: "#00000060" }}
          >
            {TEMPLATE_TYPE[item.type].label}
          </Typography>
          {/* If Has Audio */}
          {item.audio && size !== "small" && (
            <div className={styles.template_sequence_card_audio}>
              <div className={styles.template_sequence_card_audio_row}>
                <Typography variant="body2" sx={{ color: "#343A40" }}>
                  {item.audio.name}
                </Typography>
                {actions && actions.onRemove && (
                  <div
                    onClick={() => {
                      actions.onRemove(item.audio.id);
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <CloseIcon
                      sx={{ color: "rgb(255, 0 , 0)" }}
                      fontSize="small"
                    />
                  </div>
                )}
              </div>

              {actions && actions.onPlay && (
                <FloatButton
                  size="small"
                  icon={
                    <PlayArrowIcon sx={{ color: "343A40" }} fontSize="small" />
                  }
                  onButtonClick={() => {
                    actions.onPlay(item.audio.id);
                  }}
                />
              )}
            </div>
          )}
          {actions && actions.onAdd && !item.audio && (
            <button className={styles.template_sequence_card_add}>
              <AddIcon fontSize="small" sx={{ color: "#fff" }} />
            </button>
          )}
          {actions && actions.onRemoveTemplateSection && (
            <button className={styles.template_sequence_card_remove}>
              <RemoveIcon fontSize="small" sx={{ color: "#fff" }} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default TemplateSequence;
