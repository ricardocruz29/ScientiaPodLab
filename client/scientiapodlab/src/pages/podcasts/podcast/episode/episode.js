import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuthRedirect from "../../../../hooks/useAuthRedirect";
import useChangeActiveSidebar from "../../../../hooks/useChangeActiveSidebar";
import {
  useDeleteEpisodeMutation,
  useGetEpisodeQuery,
  usePublishEpisodeMutation,
} from "../../../../redux/api/services/episodeService";
import styles from "./episode.module.css";
import { Skeleton, Typography, Tooltip } from "@mui/material";
import Button from "../../../../components/button/button";
import moment from "moment";
import AudioWave from "../../../../components/audioWave/audioWave";
import InfoIcon from "@mui/icons-material/Info";
import TemplateSequence from "../../../../components/templateSequence/templateSequence";
import { useLazyGetResourcesQuery } from "../../../../redux/api/services/resourceService";

const EPISODE_STATES = {
  PUBLISHED: "Publicado",
  FINISHED: "Gravado",
  RENDERING: "A Processar",
  RECORDING: "Em Gravação",
};

function Episode() {
  const navigate = useNavigate();

  const [deleteEpisodeMutation] = useDeleteEpisodeMutation();
  const [publishEpisodeMutation] = usePublishEpisodeMutation();

  useAuthRedirect();
  useChangeActiveSidebar("podcasts");

  const { episodeId } = useParams();

  // Get data
  const { data, isLoading } = useGetEpisodeQuery(
    { episodeID: episodeId },
    { refetchOnMountOrArgChange: true }
  );

  // Lazy query to get resources
  const [getResources, { data: resourcesData }] = useLazyGetResourcesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  const [episodeSegments, setEpisodeSegments] = useState();
  useEffect(() => {
    if (data) {
      const eSegments = data.segments.map((es) => ({
        type: es.type,
        position: es.position,
        audio: undefined, // will be updated later if resourceId is defined
        ID: es.ID,
        isTmp: false,
        resourceId: es.resourceId, // keep track of resourceId
      }));

      setEpisodeSegments(eSegments);

      // If there are any segments with resourceId, trigger the resource fetch
      if (eSegments.some((es) => es.resourceId !== undefined)) {
        getResources();
      }
    }
  }, [data, getResources]);

  useEffect(() => {
    if (resourcesData && episodeSegments.length > 0) {
      const updatedSegments = episodeSegments.map((segment) => {
        if (segment.resourceId !== undefined) {
          // Find the corresponding resource in the resourcesData
          const resource = resourcesData.find(
            (res) => res.ID === segment.resourceId
          );
          return {
            ...segment,
            audio: resource
              ? { name: resource.name, url: resource.url }
              : undefined, // Assign URL if resource found
          };
        }
        return segment;
      });

      setEpisodeSegments(updatedSegments);
    }
  }, [resourcesData]);

  return (
    <>
      <div className={styles.page_container}>
        {isLoading && (
          <Skeleton variant="rectangular" width={1300} height={720} />
        )}
        {!isLoading && data && (
          <div className={styles.episode_section}>
            <div className={styles.episode_header}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 600, marginBottom: "40px" }}
              >
                {data.name}
              </Typography>

              <div className={styles.episode_header_actions}>
                {data.status !== "RENDERING" && data.status !== "PUBLISHED" && (
                  <Button
                    type="red"
                    text="Apagar"
                    onButtonClick={() => {
                      deleteEpisodeMutation({ episodeID: episodeId });
                      navigate("/podcasts");
                    }}
                  ></Button>
                )}

                {data.status !== "RENDERING" && data.status !== "PUBLISHED" && (
                  <Button
                    type={data.status === "FINISHED" ? "yellow" : "green"}
                    text={
                      data.status === "FINISHED" ? "Editar" : "Retomar gravação"
                    }
                    onButtonClick={() => {
                      navigate(
                        `/podcasts/${data.podcastId}/episode/${data.ID}/record`
                      );
                    }}
                  ></Button>
                )}

                {data.status === "FINISHED" && (
                  <Button
                    text="Publicar episódio"
                    onButtonClick={() =>
                      publishEpisodeMutation({ episodeID: episodeId })
                    }
                  ></Button>
                )}
              </div>
            </div>
            <div className={styles.episode_card}>
              <div className={styles.episode_card_content}>
                <img
                  className={styles.episode_image}
                  alt={"Imagem do episódio " + data.name}
                  src={data.image}
                />
                <div>
                  <div className={styles.episode_card_content_main}>
                    <Typography
                      variant="body1"
                      sx={{ color: "#00000080", marginBottom: "12px" }}
                    >
                      {data.description}
                    </Typography>

                    <div
                      style={{
                        display: "flex",
                        gap: "12px",
                        marginBottom: "12px",
                      }}
                    >
                      <Typography variant="body1" sx={{ color: "#00000080" }}>
                        Gravado em:{" "}
                        {moment(data.CreatedAt).format("DD/MM/YYYY")}
                      </Typography>

                      <div
                        style={{
                          display: "flex",
                          gap: "4px",
                          alignItems: "center",
                        }}
                      >
                        <Typography variant="body1" sx={{ color: "#00000080" }}>
                          Estado: {EPISODE_STATES[data.status] ?? data.status}
                        </Typography>
                        <Tooltip
                          title={
                            <>
                              <ul
                                style={{
                                  margin: 0,
                                  padding: "8px 16px",
                                  listStyleType: "disc",
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "8px",
                                  fontSize: "12px",
                                }}
                              >
                                <li>
                                  <strong>Publicado:</strong> O teu episódio já
                                  está disponível nos diretórios de podcasts em
                                  que registaste o teu podcast. Neste momento,
                                  não é possível editar ou apagar o episódio.
                                </li>
                                <li>
                                  <strong>Gravado:</strong> O teu episódio foi
                                  processado com sucesso, e agora podes
                                  editá-lo, apagá-lo ou publicá-lo. Lembra-te de
                                  que, uma vez publicado, não poderás mais
                                  apagá-lo ou editá-lo.
                                </li>
                                <li>
                                  <strong>A Processar:</strong> O teu episódio
                                  está a ser processado. Esta operação demora
                                  apenas alguns minutos! Continua a atualizar a
                                  página, pois o áudio final aparecerá em breve.
                                </li>
                                <li>
                                  <strong>Em Gravação:</strong> A gravação do
                                  teu episódio foi interrompida. Retoma a
                                  gravação para a concluir!
                                </li>
                              </ul>
                            </>
                          }
                        >
                          <InfoIcon
                            sx={{ color: "#58C49B", cursor: "pointer" }}
                          />
                        </Tooltip>
                      </div>
                    </div>
                  </div>

                  {(data.status === "FINISHED" ||
                    data.status === "PUBLISHED") && (
                    <AudioWave audioFile={data.url} />
                  )}
                </div>
              </div>
              {episodeSegments && (
                <div className={styles.template_sequence}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Template Utilizado
                  </Typography>

                  <TemplateSequence
                    template={episodeSegments}
                    isDraggable={false}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Episode;
