import { Outlet } from "react-router-dom";
import Card from "../components/card/card";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "../components/button/button";

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
            template: ["intro", "tts", "sound_effect", "content", "outro"],
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

        <Outlet />
      </div>
    </div>
  );
};
