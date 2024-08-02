import { useNavigate } from "react-router-dom";
import useAuthRedirect from "../../hooks/useAuthRedirect";
import useChangeActiveSidebar from "../../hooks/useChangeActiveSidebar";
import { useGetPodcastsQuery } from "../../redux/api/services/podcastService";
import styles from "./podcasts.module.css";
import { useState } from "react";
import { Skeleton, Typography } from "@mui/material";
import Button from "../../components/button/button";
import WizardModal from "../../components/modals/wizard/wizard";

function Podcasts() {
  const navigate = useNavigate();

  // Middlewares
  useAuthRedirect();
  useChangeActiveSidebar("podcasts");

  // Get data
  const { data, isLoading } = useGetPodcastsQuery();

  const [wizardOpen, setWizardOpen] = useState(false);

  return (
    <>
      <div className={styles.page_container}>
        {isLoading && (
          <Skeleton variant="rectangular" width={1300} height={720} />
        )}
        {!isLoading && !data && (
          <div className={styles.no_podcasts}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, color: "#00000080", marginBottom: "36px" }}
            >
              Ainda não tens nenhum podcast :(
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, color: "#00000080" }}
            >
              Queres criar o teu primeiro podcast?
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, color: "#00000080", marginBottom: "36px" }}
            >
              Vamos ajudar-te durante todo o processo! Clica abaixo para
              começarmos.
            </Typography>

            <Button
              text="Quero criar o meu primeiro podcast"
              onButtonClick={() => setWizardOpen(true)}
            ></Button>
          </div>
        )}
        {!isLoading && data && (
          <div className={styles.podcasts_section}>
            <Typography>Podcasts sections </Typography>
            {/* //TODO: This should be deleted, only for test purposes */}
            <Button
              text="Quero criar o meu primeiro podcast"
              onButtonClick={() => setWizardOpen(true)}
            ></Button>
          </div>
        )}
      </div>
      {wizardOpen && (
        <WizardModal
          isOpen={wizardOpen}
          handleClose={() => setWizardOpen(false)}
          mode="episode"
          podcastID={6}
        />
      )}
    </>
  );
}

export default Podcasts;
