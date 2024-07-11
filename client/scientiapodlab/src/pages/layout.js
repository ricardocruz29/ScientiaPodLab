import { Outlet } from "react-router-dom";
import Card from "../components/card/card";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";

export const Layout = () => {
  return (
    <div>
      <div id="layout" class="sidebar">
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
        <Outlet />
      </div>
    </div>
  );
};
