import { Outlet } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import Card from "../components/card/card";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "../components/button/button";
import TemplateSequence from "../components/templateSequence/templateSequence";
import Dropzone from "../components/dropzone/dropzone";

export const Layout = () => {
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
  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => {
      URL.revokeObjectURL(acceptedFileIMG?.preview);
      URL.revokeObjectURL(acceptedFile?.preview);
    };
  }, [acceptedFileIMG?.preview, acceptedFile?.preview]);

  return (
    <div>
      <div id="layout" className="sidebar">
        <div>Layout - Menu/sidebar and Navbar</div>
      </div>
      <div id="detail">
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
              { type: "intro" },
              { type: "tts" },
              {
                type: "sound_effect",
              },
              { type: "content" },
              { type: "outro" },
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
            { type: "intro", audio: { name: "intro.mp3", id: 1 } },
            { type: "tts", audio: { name: "tts.mp3", id: 2 } },
            {
              type: "sound_effect",
              audio: { name: "sound_effect.mp3", id: 3 },
            },
            { type: "content", audio: { name: "content.mp3", id: 4 } },
            { type: "outro", audio: { name: "outro.mp3", id: 5 } },
          ]}
        />

        <TemplateSequence
          size="medium"
          template={[
            { type: "intro", audio: { name: "intro.mp3", id: 1 } },
            { type: "tts", audio: { name: "tts.mp3", id: 2 } },
            {
              type: "sound_effect",
              audio: { name: "sound_effect.mp3", id: 3 },
            },
            { type: "content", audio: { name: "content.mp3", id: 4 } },
            { type: "outro", audio: { name: "outro.mp3", id: 5 } },
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
          template={[
            { type: "intro" },
            { type: "tts" },
            {
              type: "sound_effect",
            },
            { type: "content" },
            { type: "outro" },
          ]}
        />

        <TemplateSequence
          size="medium"
          template={[
            { type: "intro" },
            { type: "tts" },
            {
              type: "sound_effect",
            },
            { type: "content", audio: { name: "content.mp3", id: 4 } },
            { type: "outro", audio: { name: "outro.mp3", id: 5 } },
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

        <Outlet />
      </div>
    </div>
  );
};
