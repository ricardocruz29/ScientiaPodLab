import { Modal, Typography, Box, Alert } from "@mui/material";
import styles from "./newTemplateItem.module.css";
import Button from "../../button/button";
import { useState } from "react";
import { TEMPLATE_TYPE } from "../../../lib/constants/template";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function NewTemplateItemModal({ isOpen, handleClose, handleConfirm }) {
  const [selectedItem, setSelectedItem] = useState({
    value: undefined,
    error: false,
  });

  const submitForm = () => {
    if (selectedItem.value) {
      handleConfirm(selectedItem.value);
    } else {
      setSelectedItem({ ...selectedItem, error: true });
    }
  };

  console.log("selectedItem: ", selectedItem);
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="Novo Template Modal"
    >
      <Box sx={style}>
        <Typography variant="h6">
          Escolhe uma nova secção para adicionar ao teu template
        </Typography>
        {selectedItem.error && !selectedItem.value && (
          <Alert severity="error">
            Clica numa nova secção para adicionar ao teu template.
          </Alert>
        )}
        <div className={styles.row}>
          <div
            className={`${styles.template_sequence_card} ${
              selectedItem.value === "Intro" &&
              styles.template_sequence_card_selected
            }`}
            style={{
              backgroundColor: TEMPLATE_TYPE["Intro"].color,
            }}
            onClick={() => setSelectedItem({ ...selectedItem, value: "Intro" })}
          >
            <Typography variant="h6" sx={{ color: "#00000060" }}>
              {TEMPLATE_TYPE["Intro"].label}
            </Typography>
          </div>
          <div
            className={`${styles.template_sequence_card} ${
              selectedItem.value === "Outro" &&
              styles.template_sequence_card_selected
            }`}
            style={{
              backgroundColor: TEMPLATE_TYPE["Outro"].color,
            }}
            onClick={() => setSelectedItem({ ...selectedItem, value: "Outro" })}
          >
            <Typography variant="h6" sx={{ color: "#00000060" }}>
              {TEMPLATE_TYPE["Outro"].label}
            </Typography>
          </div>
          <div
            className={`${styles.template_sequence_card} ${
              selectedItem.value === "TTS" &&
              styles.template_sequence_card_selected
            }`}
            style={{
              backgroundColor: TEMPLATE_TYPE["TTS"].color,
            }}
            onClick={() => setSelectedItem({ ...selectedItem, value: "TTS" })}
          >
            <Typography variant="h6" sx={{ color: "#00000060" }}>
              {TEMPLATE_TYPE["TTS"].label}
            </Typography>
          </div>
          <div
            className={`${styles.template_sequence_card} ${
              selectedItem.value === "Content" &&
              styles.template_sequence_card_selected
            }`}
            style={{
              backgroundColor: TEMPLATE_TYPE["Content"].color,
            }}
            onClick={() =>
              setSelectedItem({ ...selectedItem, value: "Content" })
            }
          >
            <Typography variant="h6" sx={{ color: "#00000060" }}>
              {TEMPLATE_TYPE["Content"].label}
            </Typography>
          </div>
          <div
            className={`${styles.template_sequence_card} ${
              selectedItem.value === "SoundEffect" &&
              styles.template_sequence_card_selected
            }`}
            style={{
              backgroundColor: TEMPLATE_TYPE["SoundEffect"].color,
            }}
            onClick={() =>
              setSelectedItem({ ...selectedItem, value: "SoundEffect" })
            }
          >
            <Typography variant="h6" sx={{ color: "#00000060" }}>
              {TEMPLATE_TYPE["SoundEffect"].label}
            </Typography>
          </div>
        </div>

        <div className={styles.buttons}>
          <Button
            onButtonClick={handleClose}
            type="red"
            text="Cancelar"
            size="small"
          ></Button>
          <Button
            onButtonClick={submitForm}
            text="Confirmar"
            size="small"
          ></Button>
        </div>
      </Box>
    </Modal>
  );
}
export default NewTemplateItemModal;
