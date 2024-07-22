import { Link, Outlet } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import Card from "../components/card/card";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "../components/button/button";
import TemplateSequence from "../components/templateSequence/templateSequence";
import Dropzone from "../components/dropzone/dropzone";
import AudioPlayer from "../components/audioPlayer/audioPlayer";
import AudioVoiceRecorder from "../components/audioVoiceRecorder/audioVoiceRecorder";
import AudioWave from "../components/audioWave/audioWave";
import FloatButton from "../components/floatButton/floatButton";
import MicIcon from "@mui/icons-material/Mic";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveSidebar } from "../redux/features/global/globalSlice";

export const Layout = () => {
  const dispatch = useDispatch();
  const activeSidebar = useSelector((state) => state.global.activeSidebar);
  console.log("activeSidebar: ", activeSidebar);

  const clickChangeActiveSidebar = (sidebar) => {
    dispatch(changeActiveSidebar(sidebar));
  };

  //!This state is used as mock, remove to the respective components
  // TODO: Manage acceptedFile from dropzone - This logic should be done by the parent component or in the redux
  const [acceptedFile, setAcceptedFile] = useState();
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length >= 1)
      setAcceptedFile({
        file: acceptedFiles[0],
        preview: URL.createObjectURL(acceptedFiles[0]),
      });
  }, []);
  const onReset = () => {
    setAcceptedFile(undefined);
  };

  const [acceptedFileIMG, setAcceptedFileIMG] = useState();
  const onDropIMG = useCallback((acceptedFiles) => {
    if (acceptedFiles.length >= 1) {
      setAcceptedFileIMG({
        file: acceptedFiles[0],
        preview: URL.createObjectURL(acceptedFiles[0]),
      });
    }
  }, []);
  const onResetIMG = () => {
    setAcceptedFileIMG(undefined);
  };

  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState();
  const onEndRecordAudio = (blob) => {
    setIsRecording(false);
    if (blob) {
      setRecordedAudio(URL.createObjectURL(blob));
    }
  };

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => {
      URL.revokeObjectURL(acceptedFileIMG?.preview);
      URL.revokeObjectURL(acceptedFile?.preview);
    };
  }, [acceptedFileIMG?.preview, acceptedFile?.preview]);
  //!----------------------------------------------------------------------

  return (
    <div className="container">
      <div className="logo">
        <img src="/assets/logo-small.svg" alt="Logo" />
      </div>
      <div className="navbar"></div>
      <div className="separator-column"></div>
      <div className="separator-row"></div>
      <div id="layout" className="sidebar">
        <ul>
          <li onClick={() => clickChangeActiveSidebar("podcasts")}>
            <Link
              to="/podcasts"
              className={activeSidebar === "podcasts" ? "link-active" : "link"}
            >
              <PodcastsIcon fontSize="medium"></PodcastsIcon>
              <Typography
                variant="body1"
                sx={{ fontSize: "18px", fontWeight: 500 }}
              >
                Podcasts
              </Typography>
            </Link>
          </li>
          <li onClick={() => clickChangeActiveSidebar("resources")}>
            <Link
              to="/resources"
              className={activeSidebar === "resources" ? "link-active" : "link"}
            >
              <FolderCopyIcon fontSize="medium"></FolderCopyIcon>
              <Typography
                variant="body1"
                sx={{ fontSize: "18px", fontWeight: 500 }}
              >
                Recursos
              </Typography>
            </Link>
          </li>
          <li onClick={() => clickChangeActiveSidebar("faqs")}>
            <Link
              to="/faqs"
              className={activeSidebar === "faqs" ? "link-active" : "link"}
            >
              <QuestionMarkIcon fontSize="medium"></QuestionMarkIcon>
              <Typography
                variant="body1"
                sx={{ fontSize: "18px", fontWeight: 500 }}
              >
                FAQs
              </Typography>
            </Link>
          </li>
        </ul>
      </div>
      <main id="main" className="main">
        <Card
          type={"template"}
          data={{
            title: "Monólogo",
            duration: "30s - 1min",
            hasIntro: true,
            hasOutro: false,
            hasTTS: true,
            type: "Monólogo",
            actions: [
              {
                icon: (
                  <VisibilityIcon sx={{ color: "#fff" }} fontSize="small" />
                ),
                background: "#339AF0",
              },
              {
                icon: (
                  <ContentCopyIcon sx={{ color: "#fff" }} fontSize="small" />
                ),
                background: "#FCC419",
              },
              {
                icon: <DeleteIcon sx={{ color: "#fff" }} fontSize="small" />,
                background: "#FD6773",
              },
            ],
            template: [
              { type: "intro", id: 21 },
              { type: "tts", id: 22 },
              {
                type: "sound_effect",
                id: 23,
              },
              { type: "content", id: 24 },
              { type: "outro", id: 25 },
            ],
          }}
        />
        <Button text={"Confirmar"} onButtonClick={() => console.log("Green")} />
        <Button
          text={"Texto Muito Grandeeeeeeeeeeeeeeeeeeeeeeeeee"}
          onButtonClick={() => console.log("Texto Grande")}
        />
        <Button
          text={"Confirmar"}
          size="small"
          onButtonClick={() => console.log("Small")}
        />
        <Button
          type="yellow"
          text="Editar"
          onButtonClick={() => console.log("Yellow")}
        />
        <Button
          type="red"
          text={"Remover"}
          onButtonClick={() => console.log("Red")}
        />
        <Button
          type="fill_green"
          text={"Confirmar"}
          onButtonClick={() => console.log("Fill Green")}
        />

        <TemplateSequence
          size="medium"
          template={[
            { type: "intro", id: 1, audio: { name: "intro.mp3", id: 1 } },
            { type: "tts", id: 2, audio: { name: "tts.mp3", id: 2 } },
            {
              type: "sound_effect",
              id: 3,
              audio: { name: "sound_effect.mp3", id: 3 },
            },
            { type: "content", id: 4, audio: { name: "content.mp3", id: 4 } },
            { type: "outro", id: 5, audio: { name: "outro.mp3", id: 5 } },
          ]}
        />

        <TemplateSequence
          size="medium"
          template={[
            { type: "intro", id: 6, audio: { name: "intro.mp3", id: 1 } },
            { type: "tts", id: 7, audio: { name: "tts.mp3", id: 2 } },
            {
              type: "sound_effect",
              id: 8,
              audio: { name: "sound_effect.mp3", id: 3 },
            },
            { type: "content", id: 9, audio: { name: "content.mp3", id: 4 } },
            { type: "outro", id: 10, audio: { name: "outro.mp3", id: 5 } },
          ]}
          actions={{
            onRemove: (id) => {
              console.log("id: ", id);
            },
            onPlay: (id) => {
              console.log("id: ", id);
            },
          }}
        />

        <TemplateSequence
          size="medium"
          isDraggable={true}
          template={[
            { type: "intro", id: 11 },
            { type: "tts", id: 22 },
            {
              type: "sound_effect",
              id: 13,
            },
            { type: "content", id: 14 },
            { type: "outro", id: 15 },
          ]}
        />

        <TemplateSequence
          size="medium"
          template={[
            { type: "intro", id: 16 },
            { type: "tts", id: 17 },
            {
              type: "sound_effect",
              id: 18,
            },
            { type: "content", id: 4, audio: { name: "content.mp3", id: 19 } },
            { type: "outro", id: 5, audio: { name: "outro.mp3", id: 20 } },
          ]}
          actions={{
            onRemove: (id) => {
              console.log("id: ", id);
            },
            onPlay: (id) => {
              console.log("id: ", id);
            },
            onAdd: (id) => {
              console.log("id: ", id);
            },
            onRemoveTemplateSection: (id) => {
              console.log("id: ", id);
            },
          }}
        />

        <Dropzone
          placeholder="Arrasta ou clica para importares o teu áudio"
          secondaryPlaceholder="De momento, suportamos apenas o formato mp3"
          acceptedFile={acceptedFile}
          onDrop={onDrop}
          onReset={onReset}
        />

        {acceptedFile && acceptedFile.preview && (
          <div style={{ display: "flex", gap: "24px" }}>
            <Card
              type={"audio"}
              data={{
                title: "water.mp3",
                audioFile: acceptedFile.preview,
              }}
            />
            <Card
              size="small"
              type={"audio"}
              data={{
                title: "water.mp3",
                audioFile: acceptedFile.preview,
              }}
            />
            <AudioPlayer audioFile={acceptedFile.preview} />
          </div>
        )}

        <div style={{ width: "300px" }}>
          <Dropzone
            type="image"
            placeholder="Arrasta ou clica para importares a tua imagem"
            secondaryPlaceholder="Suportamos apenas os formatos png, jpg e jpeg"
            acceptedFile={acceptedFileIMG}
            onDrop={onDropIMG}
            onReset={onResetIMG}
          />
        </div>

        {!isRecording && !recordedAudio && (
          <FloatButton
            icon={<MicIcon sx={{ color: "#FF0000", fontSize: "48px" }} />}
            onButtonClick={() => {
              setIsRecording(true);
            }}
          />
        )}
        {isRecording && !recordedAudio && (
          <AudioVoiceRecorder
            onEnd={onEndRecordAudio}
            onClose={() => setIsRecording(false)}
          />
        )}
        {!isRecording && recordedAudio && (
          <AudioWave audioFile={recordedAudio} />
        )}

        <Outlet />
      </main>
    </div>
  );
};
