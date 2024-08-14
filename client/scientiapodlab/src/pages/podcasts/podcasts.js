import useAuthRedirect from "../../hooks/useAuthRedirect";
import useChangeActiveSidebar from "../../hooks/useChangeActiveSidebar";
import {
  useCreatePodcastMutation,
  useGetPodcastsQuery,
} from "../../redux/api/services/podcastService";
import styles from "./podcasts.module.css";
import { useEffect, useState } from "react";
import { Skeleton, Typography, Tooltip } from "@mui/material";
import Button from "../../components/button/button";
import WizardModal from "../../components/modals/wizard/wizard";
import { useCreateEpisodeMutation } from "../../redux/api/services/episodeService";
import moment from "moment";
import { PODCAST_GENRES } from "../../lib/constants/wizard";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";
import Card from "../../components/card/card";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Podcasts() {
  const navigate = useNavigate();
  const [createPodcast] = useCreatePodcastMutation();
  const [createEpisode] = useCreateEpisodeMutation();

  // Middlewares
  useAuthRedirect();
  useChangeActiveSidebar("podcasts");

  // Get data
  const { data, isLoading } = useGetPodcastsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (data) setPodcasts(data);
  }, [data]);

  const [podcastWizardOpen, setPodcastWizardOpen] = useState(false);
  const [episodeWizardOpenID, setEpisodeWizardOpenID] = useState();
  const [podcasts, setPodcasts] = useState([]);

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
        const episode = await createEpisode(formData).unwrap();

        navigate(
          `/podcasts/${episodeWizardOpenID}/episode/${episode.ID}/record`
        );
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
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {podcast.name}
                  </Typography>

                  <div className={styles.podcast_card_content}>
                    <img
                      className={styles.podcast_image}
                      alt={"Imagem do podcast " + podcast.name}
                      src={podcast.image}
                    />
                    <div>
                      <div className={styles.podcast_card_content_main}>
                        <Typography
                          variant="body1"
                          sx={{ color: "#00000080", marginBottom: "12px" }}
                        >
                          {podcast.description}
                        </Typography>

                        <div
                          style={{
                            display: "flex",
                            gap: "12px",
                            marginBottom: "12px",
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{ color: "#00000080" }}
                          >
                            Data lançamento:{" "}
                            {moment(podcast.CreatedAt).format("DD/MM/YYYY")}
                          </Typography>

                          {podcast.episodes.length > 0 && (
                            <Typography
                              variant="body1"
                              sx={{ color: "#00000080" }}
                            >
                              Número episódios: {podcast.episodes.length}
                            </Typography>
                          )}

                          <Typography
                            variant="body1"
                            sx={{ color: "#00000080" }}
                          >
                            Género:{" "}
                            {
                              PODCAST_GENRES.find(
                                (pg) => pg.value === podcast.genre
                              )?.label
                            }
                          </Typography>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            gap: "4px",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{ color: "#00000080" }}
                          >
                            RSS Feed: {podcast.rssFeed}
                          </Typography>
                          <Tooltip
                            title={
                              <p style={{ fontSize: "12px" }}>
                                O RSS Feed do podcast é uma lista que se
                                atualiza automaticamente com todos os episódios
                                do teu podcast. Quando gravares um novo
                                episódio, esta lista é atualizada de forma
                                automática. Cada podcast que criares terá um RSS
                                Feed único. Com este link, podes publicar os
                                teus podcasts nas plataformas que preferires.
                                Assim, sempre que gravares um novo episódio, ele
                                será automaticamente adicionado às tuas
                                plataformas de podcasts favoritas. Para mais
                                informações, visita a secção de Ajuda.
                              </p>
                            }
                          >
                            <InfoIcon
                              sx={{ color: "#58C49B", cursor: "pointer" }}
                            />
                          </Tooltip>
                        </div>
                      </div>

                      {podcast.episodes?.length > 0 ? (
                        <>
                          <div className={styles.episodes_list}>
                            {podcast.episodes.map((episode, index) => {
                              return (
                                <Card
                                  key={index}
                                  type="episode"
                                  size="small"
                                  data={{
                                    ...episode,
                                    title: episode.name,
                                    actions: [
                                      {
                                        icon: (
                                          <VisibilityIcon
                                            sx={{ color: "#fff" }}
                                            fontSize="small"
                                          />
                                        ),
                                        background: "#339AF0",
                                        action: () => {
                                          navigate(
                                            `/podcasts/${episode.podcastId}/episode/${episode.ID}`
                                          );
                                        },
                                      },
                                    ],
                                  }}
                                />
                              );
                            })}
                          </div>

                          <Button
                            type="fill_green"
                            size="small"
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
