import {
  Modal,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Alert,
} from "@mui/material";
import styles from "./wizard.module.css";
import { useEffect, useState, useCallback } from "react";
import Button from "../../button/button";
import { Formik, Form, Field } from "formik";
import {
  organizationCreateValidationSchema,
  planCreateValidationSchema,
} from "../../../validators/wizard.validator";
import Dropzone from "../../dropzone/dropzone";
import { useGetTemplatesQuery } from "../../../redux/api/services/templateService";
import TemplateSequence from "../../templateSequence/templateSequence";
import { TEMPLATE_GENRES } from "../../../lib/constants/template";
import { PODCAST_GENRES, TARGET_AUDIENCE } from "../../../lib/constants/wizard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1240,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function WizardModal({ isOpen, handleClose, handleConfirm, mode = "podcast" }) {
  const [activeStep, setActiveStep] = useState(1);
  const [steps, setSteps] = useState([]);
  const [values, setValues] = useState({});
  const { data: templates } = useGetTemplatesQuery();

  const onDropIMG = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length >= 1) {
        setValues({
          ...values,
          plan: {
            ...values.plan,
            image: {
              file: acceptedFiles[0],
              preview: URL.createObjectURL(acceptedFiles[0]),
              error: false,
            },
          },
        });
      }
    },
    [values]
  );

  const onResetIMG = () => {
    setValues({
      ...values,
      plan: {
        ...values.plan,
        image: {
          file: undefined,
          preview: undefined,
          error: false,
        },
      },
    });
  };

  useEffect(() => {
    // Make sure to revoke the values uris to avoid memory leaks, will run on unmount
    return () => {
      URL.revokeObjectURL(values.plan?.image?.preview);
    };
  }, [values.plan?.image?.preview]);

  useEffect(() => {
    const steps =
      mode === "podcast"
        ? ["Planeamento", "Equipamento de Gravação", "Dicas"]
        : [
            "Planeamento",
            "Organização dos Episódios",
            "Equipamento de Gravação",
            "Dicas",
          ];

    const values =
      mode === "podcast"
        ? {
            plan: {
              image: { preview: undefined, file: undefined, error: false },
              name: "",
              description: "",
              genre: "",
              target: "",
            },
          }
        : {
            plan: {
              image: { preview: undefined, file: undefined, error: false },
              name: "",
              description: "",
              genre: "",
              target: "",
            },
            organization: {
              templateID: "",
            },
          };

    setSteps(steps);
    setValues(values);
  }, [mode]);

  const handlePrev = () => {
    if (activeStep === 1) {
      handleClose();
    } else {
      //If we get back, and we have a image, generate a new url
      if (activeStep === 2 && values.plan.image.file) {
        setValues({
          ...values,
          plan: {
            ...values.plan,
            image: {
              ...values.plan.image,
              preview: URL.createObjectURL(values.plan.image.file),
            },
          },
        });
      }

      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleNext = (formValues) => {
    if (activeStep === 1) {
      setValues({
        ...values,
        plan: {
          ...values.plan,
          name: formValues.name,
          description: formValues.description,
          genre: formValues.genre,
          target: formValues.target,
          image: {
            ...values.plan?.image,
            error: values.plan?.image?.file === undefined,
          },
        },
      });
    }

    if (activeStep !== 1 || (activeStep === 1 && values.plan?.image?.file)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  return (
    <Modal open={isOpen} onClose={handleClose} aria-labelledby="Wizard Modal">
      <Box sx={style}>
        <div className={styles.header}>
          <div className={styles.header_titles}>
            <Typography
              variant="h2"
              sx={{ fontWeight: 700, color: "#58C49B", textAlign: "center" }}
            >
              Wizard
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 500,
                color: "#58C49B90",
                textAlign: "center",
                fontSize: "18px",
              }}
            >
              O teu ajudante para ultrapassares dificuldades técnicas e para
              fazeres uma melhor Comunicação de Ciência
            </Typography>
          </div>

          <Stepper activeStep={activeStep - 1}>
            {steps?.map((label, index) => {
              const stepProps = {};

              if (index <= activeStep) {
                stepProps.completed = false;
              }

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </div>

        <div className={styles.body}>
          {activeStep === 1 && (
            <Formik
              initialValues={{
                name: values.plan?.name,
                genre: values.plan?.genre,
                target: values.plan?.target,
                description: values.plan?.description,
              }}
              validationSchema={planCreateValidationSchema}
              onSubmit={handleNext}
            >
              {() => (
                <div className={styles.step_container}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#343A40",
                      fontWeight: 700,
                      textAlign: "center",
                    }}
                  >
                    {mode === "podcast"
                      ? "Antes de mais, parabéns pelo teu novo podcast!"
                      : "Parabéns pela criação de mais um episódio para o teu podcast!"}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: "#343A4070", textAlign: "center" }}
                  >
                    Vamos começar o processo de criação de um novo{" "}
                    {mode === "podcast" ? "podcast" : "episódio"}.
                  </Typography>
                  <div className={styles.step_title}>
                    <div>
                      <Typography
                        variant="h4"
                        sx={{ color: "#fff", fontWeight: 700 }}
                      >
                        1
                      </Typography>
                    </div>
                    <Typography
                      variant="h6"
                      sx={{ color: "#343A40", fontWeight: 600 }}
                    >
                      Planeamento
                    </Typography>
                  </div>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#343A4070",
                      marginTop: "12px",
                      marginBottom: "32px",
                      fontSize: "12px",
                    }}
                  >
                    {mode === "podcast"
                      ? "É importante primeiro pensares e definires o objetivo  do teu podcast, assim bem como o  público-alvo que pretendes atingir. Começa por preencher as informações abaixo."
                      : "Começa por preencher a informação essencial ao teu episódio, nomeadamente o nome, descrição, género(s) e faz ainda upload de uma imagem para o teu episódio."}
                  </Typography>
                  <Form>
                    <div className={styles.first_form}>
                      <div className={styles.first_form_dropzone}>
                        <Dropzone
                          type="image"
                          placeholder="Arrasta ou clica para importares a tua imagem"
                          secondaryPlaceholder="Suportamos apenas os formatos png, jpg e jpeg"
                          acceptedFile={values.plan?.image}
                          onDrop={onDropIMG}
                          onReset={onResetIMG}
                        />
                        {values.plan?.image?.error && (
                          <Alert severity="error">
                            Tens de escolher uma fotografia para o teu podcast!
                          </Alert>
                        )}
                      </div>

                      <div className={styles.first_form_values}>
                        <Field name="name">
                          {({ field, meta }) => (
                            <TextField
                              type="text"
                              label={
                                mode === "podcast"
                                  ? "Nome podcast"
                                  : "Nome episódio"
                              }
                              {...field}
                              fullWidth
                              error={meta.touched && Boolean(meta.error)}
                              helperText={meta.touched && meta.error}
                            />
                          )}
                        </Field>

                        <Field name="description">
                          {({ field, meta }) => (
                            <TextField
                              type="text"
                              label={
                                mode === "podcast"
                                  ? "Descrição podcast"
                                  : "Descrição episódio"
                              }
                              {...field}
                              fullWidth
                              multiline
                              rows={4}
                              error={meta.touched && Boolean(meta.error)}
                              helperText={meta.touched && meta.error}
                            />
                          )}
                        </Field>

                        <Field name="genre">
                          {({ field, form, meta }) => (
                            <FormControl
                              fullWidth
                              error={meta.touched && Boolean(meta.error)}
                            >
                              <InputLabel id="category-label">
                                Gênero
                              </InputLabel>
                              <Select
                                fullWidth
                                labelId="category-label"
                                {...field}
                                label="Gênero"
                              >
                                {PODCAST_GENRES?.map((pg, index) => {
                                  return (
                                    <MenuItem key={index} value={pg.value}>
                                      {PODCAST_GENRES[index]?.label}
                                    </MenuItem>
                                  );
                                })}
                              </Select>
                              {meta.touched && meta.error && (
                                <FormHelperText>{meta.error}</FormHelperText>
                              )}
                            </FormControl>
                          )}
                        </Field>

                        <Field name="target">
                          {({ field, form, meta }) => (
                            <FormControl
                              fullWidth
                              error={meta.touched && Boolean(meta.error)}
                            >
                              <InputLabel id="category-label">
                                Público Alvo
                              </InputLabel>
                              <Select
                                fullWidth
                                labelId="category-label"
                                {...field}
                                label="Público Alvo"
                              >
                                {Object.keys(TARGET_AUDIENCE)?.map(
                                  (ta_key, index) => {
                                    return (
                                      <MenuItem key={index} value={ta_key}>
                                        {TARGET_AUDIENCE[ta_key]?.label}
                                      </MenuItem>
                                    );
                                  }
                                )}
                              </Select>
                              {meta.touched && meta.error && (
                                <FormHelperText>{meta.error}</FormHelperText>
                              )}
                            </FormControl>
                          )}
                        </Field>
                      </div>
                    </div>

                    <div className={styles.footer}>
                      <Button
                        onButtonClick={handlePrev}
                        type="red"
                        text="Cancelar"
                      ></Button>
                      <Button btnType="submit" text="Seguinte"></Button>
                    </div>
                  </Form>
                </div>
              )}
            </Formik>
          )}

          {activeStep === 2 && mode === "episode" && (
            <Formik
              initialValues={{
                template: values.organization?.templateID,
              }}
              validationSchema={organizationCreateValidationSchema}
              onSubmit={handleNext}
            >
              {() => (
                <div className={styles.step_container}>
                  <div className={styles.step_title}>
                    <div>
                      <Typography
                        variant="h4"
                        sx={{ color: "#fff", fontWeight: 700 }}
                      >
                        2
                      </Typography>
                    </div>
                    <Typography
                      variant="h6"
                      sx={{ color: "#343A40", fontWeight: 600 }}
                    >
                      Organização do Episódio
                    </Typography>
                  </div>
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#343A4070",
                      marginTop: "12px",
                      marginBottom: "32px",
                      fontSize: "12px",
                    }}
                  >
                    Escolhe um Template entre os disponibilizados pela
                    plataforma e os que tu próprio criaste! A organização do teu
                    episódio é um passo crucial!
                  </Typography>

                  <Form>
                    <Field name="template">
                      {({ field, form, meta }) => (
                        <FormControl
                          fullWidth
                          error={meta.touched && Boolean(meta.error)}
                        >
                          <InputLabel id="template-label">Template</InputLabel>
                          <Select
                            fullWidth
                            labelId="template-label"
                            {...field}
                            label="Template"
                            onChange={(event) => {
                              field.onChange(event);
                              const selectedValue = event.target.value;

                              setValues({
                                ...values,
                                organization: {
                                  ...values.organization,
                                  templateID: selectedValue,
                                },
                              });
                            }}
                          >
                            {templates?.map((t, index) => {
                              return (
                                <MenuItem key={index} value={t.ID}>
                                  {t?.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                          {meta.touched && meta.error && (
                            <FormHelperText>{meta.error}</FormHelperText>
                          )}
                        </FormControl>
                      )}
                    </Field>

                    {values.organization.templateID !== "" && (
                      <>
                        <Typography
                          variant="body1"
                          sx={{
                            color: "#00000080",
                            fontSize: "14px",
                            marginTop: "36px",
                            marginBottom: "12px",
                          }}
                        >
                          {
                            TEMPLATE_GENRES[
                              templates.find(
                                (t) => t.ID === values.organization.templateID
                              )?.genre
                            ]?.description
                          }
                        </Typography>
                        <TemplateSequence
                          template={
                            templates.find(
                              (t) => t.ID === values.organization.templateID
                            )?.segments
                          }
                        />
                      </>
                    )}

                    <div className={styles.footer}>
                      <Button
                        onButtonClick={handlePrev}
                        type="yellow"
                        text="Anterior"
                      ></Button>
                      <Button btnType="submit" text="Seguinte"></Button>
                    </div>
                  </Form>
                </div>
              )}
            </Formik>
          )}

          {((activeStep === 2 && mode === "podcast") ||
            (activeStep === 3 && mode === "episode")) && (
            <div className={styles.step_container}>
              <div className={styles.step_title}>
                <div>
                  <Typography
                    variant="h4"
                    sx={{ color: "#fff", fontWeight: 700 }}
                  >
                    {mode === "podcast" ? "2" : "3"}
                  </Typography>
                </div>
                <Typography
                  variant="h6"
                  sx={{ color: "#343A40", fontWeight: 600 }}
                >
                  Equipamento de Gravação
                </Typography>
              </div>

              <div>
                <Typography
                  variant="body1"
                  sx={{
                    color: "#00000080",
                    marginBottom: "12px",
                    marginTop: "12px",
                  }}
                >
                  Tens o teu {mode === "episode" ? "episódio" : "podcast"}{" "}
                  pensado .... Tens o template escolhido de forma a organizar
                  melhor os teus episódios ...
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#00000080", marginBottom: "24px" }}
                >
                  Só falta começar a gravar!
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#00000080", marginBottom: "12px" }}
                >
                  Mas para isso, precisas de equipamento de gravação. Nós
                  ajudamos-te em tudo o que conseguirmos, nomeadamente a dar-te
                  dicas (que será no ecrã seguinte) e no tratamento do som para
                  melhorarmos a qualidade ao máximo.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#00000080", marginBottom: "36px" }}
                >
                  Contudo, tendo em conta os teus recursos e objetivo, a decisão
                  pode passar entre gravar com um telemóvel, ou então fazeres
                  algum investimento em equipamento de gravação de qualidade. É
                  uma decisão que tens de avaliar, mas um bom áudio a longo
                  prazo é um fator bastante importante!
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "#00000080", marginBottom: "12px" }}
                >
                  Segue esta lista de equipamentos, e avalia o que necessitas:
                </Typography>
                <ul style={{ marginLeft: "36px", marginBottom: "12px" }}>
                  <li>
                    <Typography variant="body1" sx={{ color: "#00000080" }}>
                      Telemóvel - Se estiveres a fazer podcasts para
                      experimentar
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" sx={{ color: "#00000080" }}>
                      Computador - Para teres o software para tratamento dos
                      episódios, se assim entenderes
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" sx={{ color: "#00000080" }}>
                      Microfone - Se quiseres algo com mais qualidade
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" sx={{ color: "#00000080" }}>
                      Fones de ouvido - Para monitorização e garantir a melhor
                      qualidade de som
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" sx={{ color: "#00000080" }}>
                      Interface de áudio - Para conectar microfones
                      profissionais ao computador
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" sx={{ color: "#00000080" }}>
                      Software de gravação - Como Audacity ou Adobe Audition,
                      para editar os episódios
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" sx={{ color: "#00000080" }}>
                      Suportes de microfone - Para manter o microfone estável e
                      reduzir ruídos indesejados
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" sx={{ color: "#00000080" }}>
                      Acessórios de isolamento acústico - Como espumas ou
                      painéis para melhorar a qualidade do som
                    </Typography>
                  </li>
                </ul>
                <Typography
                  variant="body1"
                  sx={{ color: "#00000080", marginBottom: "12px" }}
                >
                  Isto são apenas alguns dos possíveis equipamentos de gravação.
                  Isto é um mundo, e por isso tens de avaliar bem o objetivo do
                  teu podcast e os recursos que tens disponíveis e ver o que se
                  justifica utilizar e investir.
                </Typography>
              </div>

              <div className={styles.footer}>
                <Button
                  onButtonClick={handlePrev}
                  type="yellow"
                  text="Anterior"
                ></Button>
                <Button onButtonClick={handleNext} text="Seguinte"></Button>
              </div>
            </div>
          )}

          {((activeStep === 3 && mode === "podcast") ||
            (activeStep === 4 && mode === "episode")) && (
            <div className={styles.step_container}>
              <div className={styles.step_title}>
                <div>
                  <Typography
                    variant="h4"
                    sx={{ color: "#fff", fontWeight: 700 }}
                  >
                    {mode === "podcast" ? "3" : "4"}
                  </Typography>
                </div>
                <Typography
                  variant="h6"
                  sx={{ color: "#343A40", fontWeight: 600 }}
                >
                  Temos tudo pronto para começares a gravar
                </Typography>
              </div>

              <div>
                {mode === "episode" && (
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#00000080",
                      marginBottom: "12px",
                      marginTop: "12px",
                    }}
                  >
                    Antes de começares a gravar, planeia bem o teu episódio. Faz
                    um guião se achares que se justifica, ou se quiseres algo
                    mais espontâneo aponta só os tópicos.
                  </Typography>
                )}

                <Typography
                  variant="body1"
                  sx={{
                    color: "#00000080",
                    marginBottom: "12px",
                    marginTop: "12px",
                  }}
                >
                  No próximo passo,{" "}
                  {mode === "episode"
                    ? "vais passar para a página de gravação e de edição do áudio, "
                    : "vais ser redirecionado para a página do teu podcast, onde poderás gravar o teu primeiro episódio, "}{" "}
                  mas antes lê atentamente estas dicas para tentarmos ajudar-te
                  ao máximo!
                </Typography>

                <Typography
                  variant="body1"
                  sx={{ color: "#00000080", marginBottom: "12px" }}
                >
                  Deixamos-te aqui algumas dicas para ajudar na Comunicação de
                  Ciência. Aconselhamos-te ainda a em qualquer altura visitares
                  a página de Ajuda que contém muito conteúdo que te pode ajudar
                  tanto na gravação do teu podcast, como numa melhor Comunicação
                  de Ciência.
                </Typography>
                <ul style={{ marginLeft: "36px", marginBottom: "24px" }}>
                  <li>
                    <Typography variant="body1" sx={{ color: "#00000080" }}>
                      <strong>Versatilidade da mensagem</strong> - Por vezes, o
                      público que queremos atingir nem sempre é quem nos ouve.
                      Tenta adaptar a mensagem, o ritmo, tom, e duração para
                      todos os públicos.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" sx={{ color: "#00000080" }}>
                      <strong>Conheça o público -</strong> Envolve o teu público
                      no podcast, faz senti-lo que ele faz parte.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" sx={{ color: "#00000080" }}>
                      <strong>Manter o rigor científico</strong> - Simplificar e
                      desmembrar conteúdos complexos, através de por exemplos
                      metáforas e analogias, mas sem comprometer o rigor da
                      mensagem.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" sx={{ color: "#00000080" }}>
                      <strong>Confiança e carisma -</strong> A tua voz e a
                      confiança que passas através dela impactam muito a tua
                      comunicação. Trabalha nisso para que estejas o melhor
                      preparado possível.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" sx={{ color: "#00000080" }}>
                      <strong>Duração e ritmo -</strong> Ajusta de acordo com o
                      objetivo do teu podcast e também de acordo com o teu
                      público-alvo. Para um público mais técnico e específico,
                      talvez eles vão querer algo com mais rigor e mais longo
                      para se especializarem no assunto. Para um público mais
                      jovem, onde podemos ter dificuldades em captar a sua
                      atenção, algo mais curto e mais dinâmico pode ajudar.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" sx={{ color: "#00000080" }}>
                      <strong>Usa termos técnicos com explicações -</strong> Dá
                      exemplos e contexto para facilitar a compreensão.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" sx={{ color: "#00000080" }}>
                      <strong>Incorporar elementos sonoros -</strong> Jingles e
                      música de fundo ajudam a capturar a atenção.
                    </Typography>
                  </li>
                </ul>
              </div>

              <div className={styles.footer}>
                <Button
                  onButtonClick={handlePrev}
                  type="yellow"
                  text="Anterior"
                ></Button>
                <Button
                  onButtonClick={() => handleConfirm(values)}
                  type="fill_green"
                  text="Vamos a isso!"
                ></Button>
              </div>
            </div>
          )}
        </div>
      </Box>
    </Modal>
  );
}
export default WizardModal;
