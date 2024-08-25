import { Modal, Typography, TextField, Box } from "@mui/material";
import styles from "./duplicateTemplate.module.css";
import TemplateSequence from "../../templateSequence/templateSequence";
import Button from "../../button/button";
import { Formik, Form, Field } from "formik";
import { duplicateTemplateValidationSchema } from "../../../validators/template.validator";
import { TEMPLATE_GENRES } from "../../../lib/constants/template";

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

function DuplicateTemplateModal({
  originalTemplate,
  isOpen,
  handleClose,
  handleConfirm,
}) {
  console.log("originalTemplate: ", originalTemplate);

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="Duplicar Template Modal"
    >
      <Box sx={style}>
        <Typography variant="h6">
          Duplicar Template: {originalTemplate.name}
        </Typography>
        <div className={styles.template_info}>
          <div>
            <Typography variant="body2" sx={{ color: "#00000080" }}>
              Duração: {originalTemplate.duration}
            </Typography>
            <Typography variant="body2" sx={{ color: "#00000080" }}>
              Intro: {originalTemplate.hasIntro ? "Sim" : "Não"}
            </Typography>
            <Typography variant="body2" sx={{ color: "#00000080" }}>
              Outro: {originalTemplate.hasOutro ? "Sim" : "Não"}
            </Typography>
            <Typography variant="body2" sx={{ color: "#00000080" }}>
              Narração (Text-to-Speech):{" "}
              {originalTemplate.hasTTS ? "Sim" : "Não"}
            </Typography>
            <Typography variant="body2" sx={{ color: "#00000080" }}>
              Tipo: {TEMPLATE_GENRES[originalTemplate.genre]?.label}
            </Typography>
          </div>

          <div className={styles.template_sequence}>
            <TemplateSequence
              size="small"
              template={originalTemplate.segments}
            />
          </div>
        </div>

        <Formik
          initialValues={{
            newTemplateName: "",
          }}
          validationSchema={duplicateTemplateValidationSchema}
          onSubmit={handleConfirm}
        >
          {() => (
            <Form>
              <Field name="newTemplateName">
                {({ field, meta }) => (
                  <TextField
                    type="text"
                    label="Nome novo template"
                    {...field}
                    fullWidth
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>

              <div className={styles.buttons}>
                <Button
                  onButtonClick={handleClose}
                  type="red"
                  text="Cancelar"
                  size="small"
                ></Button>
                <Button btnType="submit" text="Confirmar" size="small"></Button>
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
export default DuplicateTemplateModal;
