import { Link, Outlet } from "react-router-dom";
import PodcastsIcon from "@mui/icons-material/Podcasts";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeActiveSidebar } from "../redux/features/global/globalSlice";

export const Layout = () => {
  const dispatch = useDispatch();
  const activeSidebar = useSelector((state) => state.global.activeSidebar);

  const clickChangeActiveSidebar = (sidebar) => {
    dispatch(changeActiveSidebar(sidebar));
  };

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
          <li onClick={() => clickChangeActiveSidebar("help")}>
            <Link
              to="/help"
              className={activeSidebar === "help" ? "link-active" : "link"}
            >
              <QuestionMarkIcon fontSize="medium"></QuestionMarkIcon>
              <Typography
                variant="body1"
                sx={{ fontSize: "18px", fontWeight: 500 }}
              >
                Ajuda
              </Typography>
            </Link>
          </li>
        </ul>
      </div>
      <main id="main" className="main">
        <Outlet />
      </main>
    </div>
  );
};
