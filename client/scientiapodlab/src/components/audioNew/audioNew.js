import { useEffect, useState, useCallback } from "react";
import { useGetResourcesQuery } from "../../redux/api/services/resourceService";
import { Tabs, Tab, Skeleton, Alert } from "@mui/material";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import MicIcon from "@mui/icons-material/Mic";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import styles from "./audioNew.module.css";
import Card from "../../components/card/card";
import Button from "../button/button";
import Dropzone from "../dropzone/dropzone";

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
    if (!newAudio) {
      setError(true);
    } else {
      handleConfirm(newAudio, tabs?.find((t) => t.active)?.label);
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
                  .filter(
                    (r) =>
                      r.type_segment === "SoundEffect" ||
                      r.type_segment === "Intro" ||
                      r.type_segment === "Outro" ||
                      r.type_segment === "Content"
                  )
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

      <div className={styles.actions}>
        <Button onButtonClick={onHandleCancel} type="red" text="Cancelar" />
        <Button onButtonClick={onHandleConfirm} text="Confirmar" />
      </div>
    </div>
  );
}

export default AudioNew;
