import { Modal, Typography, Box } from "@mui/material";
import Button from "../../button/button";
import { useNavigate } from "react-router-dom";

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

function EpisodeRenderModal({ isOpen, handleClose }) {
  const navigate = useNavigate();

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="Aviso Episódio Renderização"
    >
      <Box sx={style}>
        <Typography variant="h6" sx={{ marginBottom: "40px" }}>
          Parabéns pelo teu novo episódio! O teu áudio está neste preciso
          momento a ser processado!
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: "#00000080", marginBottom: "12px" }}
        >
          Podes fechar esta mensagem, e ir verificando na tua página de podcasts
          o estado do teu episódio. Para atualizares, vai dando refresh!
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#00000080", marginBottom: "12px" }}
        >
          Mais uma vez parabéns, demoramos apenas uns minutos até terminar o teu
          processamento :)
        </Typography>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onButtonClick={() => {
              navigate("/podcasts");
              handleClose();
            }}
            type="fill_green"
            size="small"
            text="Finalizar"
          />
        </div>
      </Box>
    </Modal>
  );
}
export default EpisodeRenderModal;
