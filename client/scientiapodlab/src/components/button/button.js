import { Typography } from "@mui/material";
import styles from "./button.module.css";

function Button({ type = "green", size = "medium", text, onButtonClick }) {
  return (
    <button
      onClick={onButtonClick}
      className={`${styles.button} ${type === "green" && styles.button_green} ${
        type === "yellow" && styles.button_yellow
      } ${type === "red" && styles.button_red} ${
        type === "fill_green" && styles.button_fill_green
      } ${size === "small" && styles.small_button}`}
    >
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        {text}
      </Typography>
    </button>
  );
}

export default Button;
