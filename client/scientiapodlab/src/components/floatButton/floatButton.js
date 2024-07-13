import styles from "./floatButton.module.css";

function FloatButton({ size = "big", icon, onButtonClick }) {
  return (
    <button
      onClick={onButtonClick}
      className={`${styles.floatButton} ${
        size === "medium" && styles.medium_floatButton
      } ${size === "small" && styles.small_floatButton}`}
    >
      {icon}
    </button>
  );
}

export default FloatButton;
