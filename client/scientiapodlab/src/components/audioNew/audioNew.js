import { useEffect, useState, useCallback } from "react";
import { useGetResourcesQuery } from "../../redux/api/services/resourceService";
import {
  Tabs,
  Tab,
  Skeleton,
  Alert,
  TextField,
  Typography,
} from "@mui/material";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import MicIcon from "@mui/icons-material/Mic";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import styles from "./audioNew.module.css";
import Card from "../../components/card/card";
import Button from "../button/button";
import Dropzone from "../dropzone/dropzone";
import FloatButton from "../../components/floatButton/floatButton";
import AudioWave from "../audioWave/audioWave";
import AudioVoiceRecorder from "../audioVoiceRecorder/audioVoiceRecorder";
import {
  newAudioNameValidationSchema,
  newAudioTTSValidationSchema,
} from "../../validators/newAudio.validator";
import { Formik, Form, Field } from "formik";

function AudioNew({ type, handleConfirm, handleCancel }) {
  const { data: resources, isLoading: isLoadingResources } =
    useGetResourcesQuery();

  const [tabs, setTabs] = useState();
  const onChangeTab = (_, newValue) => {
    const availableTabs = [...tabs];

    availableTabs.forEach((t) => {
      t.active = false;
    });

    availableTabs[newValue].active = true;

    setTabs(availableTabs);
    setNewAudio(undefined);
    setError(false);
  };

  const [newAudio, setNewAudio] = useState();
  const [error, setError] = useState(false);

  const onHandleConfirm = () => {
    const currentTab = tabs?.find((t) => t.active)?.label;

    if (!newAudio) {
      setError(true);
    } else {
      if (currentTab === "Gravar" && newAudio.name === "") {
        setError(true);
      } else if (
        currentTab === "Texto" &&
        newAudio.name === "" &&
        newAudio.text === ""
      ) {
        setError(true);
      } else {
        handleConfirm(newAudio, currentTab);
      }
    }
  };

  const onHandleCancel = () => {
    setError(false);
    handleCancel();
  };

  //Specific to type Biblioteca
  const toggleNewAudio = (audio) => {
    if (newAudio?.ID === audio.ID) setNewAudio(undefined);
    if (newAudio?.ID !== audio.ID) setNewAudio(audio);

    setError(false);
  };

  //Specific to type Importar
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length >= 1)
      setNewAudio({
        file: acceptedFiles[0],
        preview: URL.createObjectURL(acceptedFiles[0]),
      });
    setError(false);
  }, []);
  const onReset = () => {
    setError(false);
    setNewAudio(undefined);
  };

  //Specific to type Gravar
  const [isRecording, setIsRecording] = useState(false);
  const onEndRecordAudio = (blob) => {
    setIsRecording(false);
    setError(false);
    if (blob) {
      setNewAudio({
        ...newAudio,
        file: blob,
        preview: URL.createObjectURL(blob),
      });
    }
  };

  useEffect(() => {
    console.log("insideUseEffect: ", type);
    if (type) {
      const availableTabs = [];
      if (type === "SoundEffect" || type === "TTS") {
        availableTabs.push({
          icon: <FolderCopyIcon fontSize="medium" />,
          label: "Biblioteca",
          type,
          active: false,
        });
      }

      if (
        type === "Intro" ||
        type === "Outro" ||
        type === "Content" ||
        type === "SoundEffect"
      ) {
        availableTabs.push({
          icon: <FileUploadIcon fontSize="medium" />,
          label: "Importar",
          type,
          active: false,
        });
      }

      if (type === "Intro" || type === "Outro" || type === "Content") {
        availableTabs.push({
          icon: <MicIcon fontSize="medium" />,
          label: "Gravar",
          type,
          active: false,
        });
      }

      if (type === "TTS") {
        availableTabs.push({
          icon: <TextFieldsIcon fontSize="medium" />,
          label: "Texto",
          type,
          active: false,
        });
      }

      availableTabs[0].active = true;

      setTabs(availableTabs);
    }
  }, [type]);

  console.log("newAudio: ", newAudio);

  return (
    <div className={styles.audio_new_container}>
      {tabs?.length > 0 && (
        <Tabs
          value={tabs?.findIndex((t) => t.active)}
          onChange={onChangeTab}
          aria-label="icon position tabs example"
        >
          {tabs.map((tab, index) => {
            return (
              <Tab
                key={index}
                icon={tab.icon}
                label={tab.label}
                iconPosition="start"
              />
            );
          })}
        </Tabs>
      )}

      {/* //! Library Sound Effect */}
      {tabs?.find((t) => t.active)?.label === "Biblioteca" &&
        tabs?.find((t) => t.active)?.type === "SoundEffect" && (
          <section className={styles.resources_section}>
            {isLoadingResources && (
              <div className={styles.resources_row}>
                <Skeleton variant="rectangular" width={200} height={225} />
                <Skeleton variant="rectangular" width={200} height={225} />
                <Skeleton variant="rectangular" width={200} height={225} />
                <Skeleton variant="rectangular" width={200} height={225} />
                <Skeleton variant="rectangular" width={200} height={225} />
                <Skeleton variant="rectangular" width={200} height={225} />
              </div>
            )}
            {!isLoadingResources && resources && (
              <div className={styles.resources_row}>
                {resources
                  .filter((r) => r.type_segment === "SoundEffect")
                  ?.map((resource, index) => {
                    return (
                      <Card
                        key={index}
                        type="audio"
                        data={{
                          title: resource.name,
                          audioFile: resource.url,
                        }}
                        onClick={() => toggleNewAudio(resource)}
                        isSelected={resource.ID === newAudio?.ID}
                      ></Card>
                    );
                  })}
              </div>
            )}
            {error && (
              <div className={styles.alert}>
                <Alert severity="error">
                  Tens de escolher um áudio para seguires em frente!
                </Alert>
              </div>
            )}
          </section>
        )}

      {/* //! Library TTS */}
      {tabs?.find((t) => t.active)?.label === "Biblioteca" &&
        tabs?.find((t) => t.active)?.type === "TTS" && (
          <section className={styles.resources_section}>
            {isLoadingResources && (
              <div className={styles.resources_row}>
                <Skeleton variant="rectangular" width={200} height={225} />
                <Skeleton variant="rectangular" width={200} height={225} />
                <Skeleton variant="rectangular" width={200} height={225} />
                <Skeleton variant="rectangular" width={200} height={225} />
                <Skeleton variant="rectangular" width={200} height={225} />
                <Skeleton variant="rectangular" width={200} height={225} />
              </div>
            )}
            {!isLoadingResources && resources && (
              <div className={styles.resources_row}>
                {resources
                  .filter((r) => r.type_segment === "TTS")
                  ?.map((resource, index) => {
                    return (
                      <Card
                        key={index}
                        type="audio"
                        data={{
                          title: resource.name,
                          audioFile: resource.url,
                        }}
                        onClick={() => toggleNewAudio(resource)}
                        isSelected={resource.ID === newAudio?.ID}
                      ></Card>
                    );
                  })}
              </div>
            )}
            {error && (
              <div className={styles.alert}>
                <Alert severity="error">
                  Tens de escolher um áudio para seguires em frente!
                </Alert>
              </div>
            )}
          </section>
        )}

      {/* //! Importing */}
      {tabs?.find((t) => t.active)?.label === "Importar" && (
        <section className={styles.import_section}>
          <Dropzone
            placeholder="Arrasta ou clica para importares o teu áudio"
            secondaryPlaceholder="De momento, suportamos apenas o formato mp3"
            acceptedFile={newAudio}
            onDrop={onDrop}
            onReset={onReset}
          />

          {error && (
            <div className={styles.alert}>
              <Alert severity="error">
                Tens de escolher um áudio para seguires em frente!
              </Alert>
            </div>
          )}
        </section>
      )}

      {/* //! Recording */}
      {tabs?.find((t) => t.active)?.label === "Gravar" && (
        <section className={styles.record_section}>
          <Formik
            initialValues={{ name: "" }}
            validationSchema={newAudioNameValidationSchema}
          >
            {({ setFieldValue }) => (
              <Form>
                <Field name="name">
                  {({ field, meta }) => (
                    <TextField
                      type="text"
                      label="Nome áudio"
                      {...field}
                      value={newAudio?.name}
                      onChange={(e) => {
                        const value = e.target.value;
                        setNewAudio({ ...newAudio, name: value });
                        setFieldValue("name", value);
                      }}
                      fullWidth
                      error={meta.touched && Boolean(meta.error)}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                </Field>
              </Form>
            )}
          </Formik>
          <div className={styles.record_section_audio}>
            {!isRecording && !newAudio?.preview && (
              <FloatButton
                icon={<MicIcon sx={{ color: "#FF0000", fontSize: "48px" }} />}
                onButtonClick={() => {
                  setIsRecording(true);
                }}
              />
            )}
            {isRecording && !newAudio?.preview && (
              <AudioVoiceRecorder
                onEnd={onEndRecordAudio}
                onClose={() => setIsRecording(false)}
              />
            )}
            {!isRecording && newAudio?.preview && (
              <AudioWave audioFile={newAudio.preview} />
            )}
          </div>

          {error && (
            <div className={styles.alert}>
              <Alert severity="error">
                Tens de gravar um áudio e atribuires-lhe um nome para seguires
                em frente!
              </Alert>
            </div>
          )}
        </section>
      )}

      {/* //! TTS */}
      {tabs?.find((t) => t.active)?.label === "Texto" && (
        <section className={styles.tts_section}>
          <div className={styles.tts_section_content}>
            <div className={styles.tts_section_content_voices}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 600,
                  color: "#343A4080",
                }}
              >
                Escolhe uma Voz entre as disponíveis
              </Typography>
              <div className={styles.tts_section_content_voices_grid}>
                <Card
                  type="audio"
                  size="small"
                  data={{
                    title: "Voz A.mp3",
                    audioFile: "http://localhost:4000/cdn/audios/tts/a.mp3",
                  }}
                  onClick={() =>
                    setNewAudio({ ...newAudio, voice: "pt-PT-Standard-a" })
                  }
                  isSelected={newAudio?.voice === "pt-PT-Standard-a"}
                ></Card>
                <Card
                  type="audio"
                  size="small"
                  data={{
                    title: "Voz B.mp3",
                    audioFile: "http://localhost:4000/cdn/audios/tts/b.mp3",
                  }}
                  onClick={() =>
                    setNewAudio({ ...newAudio, voice: "pt-PT-Standard-B" })
                  }
                  isSelected={newAudio?.voice === "pt-PT-Standard-B"}
                ></Card>
                <Card
                  type="audio"
                  size="small"
                  data={{
                    title: "Voz C.mp3",
                    audioFile: "http://localhost:4000/cdn/audios/tts/c.mp3",
                  }}
                  onClick={() =>
                    setNewAudio({ ...newAudio, voice: "pt-PT-Standard-C" })
                  }
                  isSelected={newAudio?.voice === "pt-PT-Standard-C"}
                ></Card>
                <Card
                  type="audio"
                  size="small"
                  data={{
                    title: "Voz D.mp3",
                    audioFile: "http://localhost:4000/cdn/audios/tts/d.mp3",
                  }}
                  onClick={() =>
                    setNewAudio({ ...newAudio, voice: "pt-PT-Standard-D" })
                  }
                  isSelected={newAudio?.voice === "pt-PT-Standard-D"}
                ></Card>
              </div>
            </div>
            <Formik
              initialValues={{ name: "", text: "" }}
              validationSchema={newAudioTTSValidationSchema}
            >
              {({ setFieldValue }) => (
                <Form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                  }}
                >
                  <Field name="name">
                    {({ field, meta }) => (
                      <TextField
                        type="text"
                        label="Nome áudio"
                        {...field}
                        value={newAudio?.name}
                        onChange={(e) => {
                          const value = e.target.value;
                          setNewAudio({ ...newAudio, name: value });
                          setFieldValue("name", value);
                        }}
                        fullWidth
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                  <Field name="text">
                    {({ field, meta }) => (
                      <TextField
                        type="text"
                        label="Texto"
                        {...field}
                        value={newAudio?.text}
                        onChange={(e) => {
                          const value = e.target.value;
                          setNewAudio({ ...newAudio, text: value });
                          setFieldValue("text", value);
                        }}
                        multiline
                        rows={11}
                        fullWidth
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                </Form>
              )}
            </Formik>
          </div>

          {error && (
            <div className={styles.alert}>
              <Alert severity="error">
                Tens de escolher uma voz e escrever um texto para que possamos
                gerar um áudio!
              </Alert>
            </div>
          )}
        </section>
      )}

      <div className={styles.actions}>
        <Button onButtonClick={onHandleCancel} type="red" text="Cancelar" />
        <Button onButtonClick={onHandleConfirm} text="Confirmar" />
      </div>
    </div>
  );
}

export default AudioNew;
