import useAuthRedirect from "../../hooks/useAuthRedirect";
import useChangeActiveSidebar from "../../hooks/useChangeActiveSidebar";
import {
  useCreatePodcastMutation,
  useGetPodcastsQuery,
} from "../../redux/api/services/podcastService";
import styles from "./podcasts.module.css";
import { useState } from "react";
import { Skeleton, Typography } from "@mui/material";
import Button from "../../components/button/button";
import WizardModal from "../../components/modals/wizard/wizard";

function Podcasts() {
  const [createPodcast] = useCreatePodcastMutation();

  // Middlewares
  useAuthRedirect();
  useChangeActiveSidebar("podcasts");

  // Get data
  const { data, isLoading } = useGetPodcastsQuery();

  const [wizardOpen, setWizardOpen] = useState(false);

  const handleConfirm = async (values) => {
    const formData = new FormData();

    if (values.plan) {
      formData.append("name", values.plan.name);
      formData.append("description", values.plan.description);
      formData.append("genre", values.plan.genre);

      if (values.plan.image && values.plan.image.file) {
        formData.append("image", values.plan.image.file);
      }
    }

    //! For episode
    // if (values.organization) {
    //   formData.append("templateId", values.organization.templateID);
    // }

    // formData.append("podcastId", podcastID);

    try {
      await createPodcast(formData).unwrap();

      setWizardOpen(false);
    } catch (error) {
      console.error("Failed to create podcast/episode", error);
    }
  };

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
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              Os teus Podcasts
            </Typography>

            {data.map((podcast, index) => {
              return (
                <div className={styles.podcast_card} key={index}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {podcast.name}
                  </Typography>
                  <img
                    className={styles.podcast_image}
                    alt={"Imagem do podcast " + podcast.name}
                    src={podcast.image}
                  />
                </div>
              );
            })}
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
          handleConfirm={(values) => handleConfirm(values)}
        />
      )}
    </>
  );
}

export default Podcasts;
