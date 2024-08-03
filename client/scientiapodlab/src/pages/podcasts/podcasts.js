import useAuthRedirect from "../../hooks/useAuthRedirect";
import useChangeActiveSidebar from "../../hooks/useChangeActiveSidebar";
import {
  useCreatePodcastMutation,
  useGetPodcastsQuery,
} from "../../redux/api/services/podcastService";
import styles from "./podcasts.module.css";
import { useEffect, useState } from "react";
import { Skeleton, Typography } from "@mui/material";
import Button from "../../components/button/button";
import WizardModal from "../../components/modals/wizard/wizard";
import { useCreateEpisodeMutation } from "../../redux/api/services/episodeService";
import { useNavigate } from "react-router-dom";

function Podcasts() {
  const navigate = useNavigate();

  const [createPodcast] = useCreatePodcastMutation();
  const [createEpisode] = useCreateEpisodeMutation();

  // Middlewares
  useAuthRedirect();
  useChangeActiveSidebar("podcasts");

  // Get data
  const { data, isLoading } = useGetPodcastsQuery();

  useEffect(() => {
    if (data) setPodcasts(data);
  }, [data]);

  const [podcastWizardOpen, setPodcastWizardOpen] = useState(false);
  const [episodeWizardOpenID, setEpisodeWizardOpenID] = useState();
  const [podcasts, setPodcasts] = useState([]);

  console.log("podcasts: ", podcasts);

  const handleConfirm = async (values, mode) => {
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
    if (values.organization) {
      formData.append("templateId", values.organization.templateID);
    }

    formData.append("podcastId", episodeWizardOpenID);

    try {
      if (mode === "podcast") {
        await createPodcast(formData).unwrap();
        setPodcastWizardOpen(false);
      } else {
        await createEpisode(formData).unwrap();
        setEpisodeWizardOpenID(undefined);
      }
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
        {!isLoading && podcasts.length === 0 && (
          <div className={styles.podcasts_section}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 600, marginBottom: "40px" }}
            >
              Os teus Podcasts
            </Typography>

            <div className={styles.no_podcasts}>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: "#00000080",
                  marginBottom: "36px",
                }}
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
                sx={{
                  fontWeight: 600,
                  color: "#00000080",
                  marginBottom: "36px",
                }}
              >
                Vamos ajudar-te durante todo o processo! Clica abaixo para
                começarmos.
              </Typography>

              <Button
                text="Quero criar o meu primeiro podcast"
                onButtonClick={() => setPodcastWizardOpen(true)}
              ></Button>
            </div>
          </div>
        )}
        {!isLoading && podcasts.length > 0 && (
          <div className={styles.podcasts_section}>
            <div className={styles.podcasts_header}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 600, marginBottom: "40px" }}
              >
                Os teus Podcasts
              </Typography>

              <Button
                text="Criar novo Podcast"
                onButtonClick={() => setPodcastWizardOpen(true)}
              ></Button>
            </div>

            {podcasts.map((podcast, index) => {
              return (
                <div className={styles.podcast_card} key={index}>
                  <div
                    onClick={() => {
                      navigate(`/podcasts/${podcast.ID}`);
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        marginBottom: "12px",
                        cursor: "pointer",
                      }}
                    >
                      {podcast.name}
                    </Typography>
                  </div>
                  <div className={styles.podcast_card_content}>
                    <img
                      className={styles.podcast_image}
                      alt={"Imagem do podcast " + podcast.name}
                      src={podcast.image}
                    />
                    <div>
                      <Typography variant="body1" sx={{ color: "#00000080" }}>
                        {podcast.description}
                      </Typography>

                      {podcast.episodes?.length > 0 ? (
                        <>
                          Map Episodes Card{" "}
                          <Button
                            text="Gravar novo episódio"
                            onButtonClick={() =>
                              setEpisodeWizardOpenID(podcast.ID)
                            }
                          ></Button>
                        </>
                      ) : (
                        <>
                          <div>
                            <Typography>
                              Ainda não gravaste nenhum episódio para este
                              podcast.
                            </Typography>
                            <Typography>
                              Clica abaixo para gravares o teu primeiro :)
                            </Typography>
                          </div>

                          <Button
                            text="Gravar primeiro episódio"
                            type="fill_green"
                            size="small"
                            onButtonClick={() =>
                              setEpisodeWizardOpenID(podcast.ID)
                            }
                          ></Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {podcastWizardOpen && (
        <WizardModal
          isOpen={podcastWizardOpen}
          handleClose={() => setPodcastWizardOpen(false)}
          handleConfirm={(values) => handleConfirm(values, "podcast")}
        />
      )}
      {episodeWizardOpenID && (
        <WizardModal
          isOpen={
            episodeWizardOpenID !== undefined && episodeWizardOpenID !== null
          }
          handleClose={() => setEpisodeWizardOpenID(undefined)}
          handleConfirm={(values) => handleConfirm(values, "episode")}
          mode="episode"
        />
      )}
    </>
  );
}

export default Podcasts;
