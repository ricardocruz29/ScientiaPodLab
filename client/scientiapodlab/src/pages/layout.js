import { Outlet } from "react-router-dom";
import Card from "../components/card/card";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "../components/button/button";
import TemplateSequence from "../components/templateSequence/templateSequence";

export const Layout = () => {
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

        <Outlet />
      </div>
    </div>
  );
};
