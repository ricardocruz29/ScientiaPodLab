import { useEffect, useState } from "react";
import useAuthRedirect from "../../../../hooks/useAuthRedirect";
import useChangeActiveSidebar from "../../../../hooks/useChangeActiveSidebar";
import {
  useGetEpisodeQuery,
  useRenderEpisodeMutation,
} from "../../../../redux/api/services/episodeService";
import styles from "./episode-record.module.css";
import { Typography, Skeleton, Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import TemplateSequence from "../../../../components/templateSequence/templateSequence";
import { reorder } from "../../../../lib/utils/reorder";
import Button from "../../../../components/button/button";
import NewTemplateItemModal from "../../../../components/modals/newTemplateItem/newTemplateItem";
import AddIcon from "@mui/icons-material/Add";
import AudioNew from "../../../../components/audioNew/audioNew";
import {
  useCreateRecordResourceMutation,
  useCreateResourceMutation,
  useCreateTTSResourceMutation,
} from "../../../../redux/api/services/resourceService";
import { useUpdateEpisodeSegmentsMutation } from "../../../../redux/api/services/segmentService";
import EpisodeRenderModal from "../../../../components/modals/episodeRender/episodeRender";
import { useLazyGetResourcesQuery } from "../../../../redux/api/services/resourceService";

function EpisodeRecord() {
  const navigate = useNavigate();

  const [renderEpisodeMutation] = useRenderEpisodeMutation();
  const [createResourceMutation] = useCreateResourceMutation();
  const [createRecordResourceMutation] = useCreateRecordResourceMutation();
  const [createTTSResourceMutation] = useCreateTTSResourceMutation();
  const [updateEpisodeSegmentsMutation] = useUpdateEpisodeSegmentsMutation();

  // Middlewares
  useAuthRedirect();
  useChangeActiveSidebar("podcasts");

  const { episodeId } = useParams();

  // Get data
  const { data: episode, isLoading } = useGetEpisodeQuery(
    {
      episodeID: episodeId,
    },
    { refetchOnMountOrArgChange: true }
  );

  const [episodeSegments, setEpisodeSegments] = useState();
  const [tmpEditableEpisodeSegments, setTmpEditableEpisodeSegments] =
    useState();

  // Lazy query to get resources
  const [getResources, { data: resourcesData }] = useLazyGetResourcesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (episode) {
      const eSegments = [];
      episode.segments.forEach((es) => {
        eSegments.push({
          type: es.type,
          position: es.position,
          audio: undefined,
          ID: es.ID,
          isTmp: false,
          resourceId: es.resourceId,
        });
      });

      setEpisodeSegments(eSegments);
      setTmpEditableEpisodeSegments(eSegments);

      // If there are any segments with resourceId, trigger the resource fetch
      if (eSegments.some((es) => es.resourceId !== undefined)) {
        getResources();
      }
    }
  }, [episode, getResources]);

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
            audio: resource ? { ...resource } : undefined, // Assign URL if resource found
          };
        }
        return segment;
      });

      setEpisodeSegments(updatedSegments);
      setTmpEditableEpisodeSegments(updatedSegments);
    }
  }, [resourcesData]);

  const [addTemplateCardModalOpen, setAddTemplateCardModalOpen] =
    useState(false);
  const [isEditingTemplate, setIsEditingTemplate] = useState(false);
  const editTemplate = () => {
    setIsEditingTemplate(true);
  };
  const cancelEditTemplate = () => {
    setTmpEditableEpisodeSegments(episodeSegments);
    setIsEditingTemplate(false);
  };
  const confirmEditTemplate = async () => {
    const simplifiedEpisodeSegments = [];
    tmpEditableEpisodeSegments.forEach((tes) => {
      if (tes.isTmp) {
        simplifiedEpisodeSegments.push({
          type: tes.type,
          resourceId: tes.audio?.ID,
        });
      } else {
        simplifiedEpisodeSegments.push({
          ID: tes.ID,
          type: tes.type,
          resourceId: tes.audio?.ID,
        });
      }
    });

    const { data } = await updateEpisodeSegmentsMutation({
      segments: simplifiedEpisodeSegments,
      episodeID: episodeId,
    });

    const { segments: updatedEpisodeSegments } = data;

    const updatedTmpEditableEpisodeSegments = [...tmpEditableEpisodeSegments];
    updatedEpisodeSegments.forEach((ues, index) => {
      const tmpEpisodeSegment = tmpEditableEpisodeSegments[index];

      tmpEpisodeSegment.isTmp = false;
      tmpEpisodeSegment.ID = ues.ID;
    });

    setEpisodeSegments(updatedTmpEditableEpisodeSegments);
    setIsEditingTemplate(false);
  };
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      tmpEditableEpisodeSegments,
      result.source.index,
      result.destination.index
    );

    // Update on BE
    setTmpEditableEpisodeSegments(items);
  };
  const removeTemplateSection = (id) => {
    const items = [...tmpEditableEpisodeSegments];

    const removingIndex = items.findIndex((i) => i.ID === id);
    items.splice(removingIndex, 1);

    setTmpEditableEpisodeSegments(items);
  };
  const addTemplateSection = (cardType) => {
    const items = [...tmpEditableEpisodeSegments];

    // Find the highest ID in the array
    const maxID = items.reduce((max, obj) => Math.max(max, obj.ID), -Infinity);

    // Fund the highest position in the array
    const maxPosition = items.reduce(
      (max, obj) => Math.max(max, obj.position),
      -Infinity
    );

    items.push({
      ID: maxID + 1,
      position: maxPosition + 1,
      type: cardType,
      isTmp: true,
    });

    setTmpEditableEpisodeSegments(items);

    setAddTemplateCardModalOpen(false);
  };

  const [addAudioSegment, setAddAudioSegment] = useState();
  const addAudioToSegment = (id) => {
    const segment = episodeSegments.find((es) => es.ID === id);

    setAddAudioSegment(segment);
  };

  const removeAudioFromSegment = (id) => {
    const eSegments = [...episodeSegments];
    const segment = eSegments.find((i) => i.ID === id);
    segment.audio = undefined;

    setEpisodeSegments(eSegments);
    setTmpEditableEpisodeSegments(eSegments);
  };

  const confirmAddAudioToSegment = async (audio, type) => {
    setError(false);

    const eSegments = [...episodeSegments];

    if (type === "Biblioteca") {
      const simplifiedEpisodeSegments = [];
      episodeSegments.forEach((es) => {
        simplifiedEpisodeSegments.push({
          ID: es.ID,
          type: es.type,
          resourceId: es.ID === addAudioSegment.ID ? audio.ID : es.audio?.ID,
        });
      });

      await updateEpisodeSegmentsMutation({
        segments: simplifiedEpisodeSegments,
        episodeID: episodeId,
      });

      const segment = eSegments.find((i) => i.ID === addAudioSegment.ID);
      segment.audio = { ...audio, id: audio.ID };
    }

    if (type === "Importar") {
      const formData = new FormData();

      formData.append("resource_audio", audio.file);
      formData.append("type_segment", addAudioSegment.type);
      formData.append("name", audio.file.name);
      formData.append("episode_segment_id", addAudioSegment.ID);

      const { data: resource } = await createResourceMutation(formData);

      const segment = eSegments.find((i) => i.ID === addAudioSegment.ID);
      segment.audio = { ...resource, id: resource?.ID };
    }

    if (type === "Gravar") {
      const formData = new FormData();

      formData.append("resource_audio", audio.file);
      formData.append("type_segment", addAudioSegment.type);
      formData.append("name", audio.name);
      formData.append("episode_segment_id", addAudioSegment.ID);

      const { data: resource } = await createRecordResourceMutation(formData);

      const segment = eSegments.find((i) => i.ID === addAudioSegment.ID);
      segment.audio = { ...resource, id: resource?.ID };
    }

    if (type === "Texto") {
      const { data: resource } = await createTTSResourceMutation({
        name: audio.name,
        text: audio.text,
        voice: audio.voice,
      });

      const segment = eSegments.find((i) => i.ID === addAudioSegment.ID);
      segment.audio = { ...resource, id: resource?.ID };
    }
    setEpisodeSegments(eSegments);
    setTmpEditableEpisodeSegments(eSegments);

    setAddAudioSegment(undefined);
  };

  const cancelAddAudioToSegment = () => {
    setAddAudioSegment(undefined);
  };

  const [error, setError] = useState(false);

  const [episodeRenderModalOpen, setEpisodeRenderModalOpen] = useState(false);

  const onGoBack = () => {
    navigate("/podcasts");
  };

  const onRenderEpisode = () => {
    if (episodeSegments.some((es) => !es.audio)) {
      setError(true);
    } else {
      setEpisodeRenderModalOpen(true);
      renderEpisodeMutation({
        data: { noiseCancellation: "false" },
        episodeID: episodeId,
      });
    }
  };

  return (
    <div className={styles.page_container}>
      {isLoading && (
        <Skeleton variant="rectangular" width={1300} height={720} />
      )}
      {!isLoading && episode && (
        <>
          <Typography variant="h4" sx={{ fontWeight: 600 }}>
            Grava o teu episódio - Construção
          </Typography>
          <div className={styles.introduction_text}>
            <Typography variant="body1" sx={{ color: "#343A4070" }}>
              Esta é a etapa para construíres o teu episódio. Oferecemos-te
              várias formas de construíres o teu episódio!!
            </Typography>
            <Typography variant="body1" sx={{ color: "#343A4070" }}>
              Importa um ficheiro de áudio, grava a tua voz aqui na plataforma
              ou experimenta a mais recente tecnologia de Text-to-Speech onde
              escreves o teu texto e nós geramos o áudio para ti!
            </Typography>
            <Typography variant="body1" sx={{ color: "#343A4070" }}>
              Vais ter um template para seguir, mas sente-te livre para fazeres
              tudo à tua maneira!
            </Typography>
            <Typography variant="body1" sx={{ color: "#343A4070" }}>
              Sente-te à vontade para utilizares os recursos que
              disponibilizámos na plataforma, faz experiências para ver se está
              ao teu agrado. Mesmo depois de finalizares, poderás voltar atrás
              para editar algum aspeto que não tenhas gostado.
            </Typography>
          </div>

          <div className={styles.template_section}>
            <div className={styles.template_section_header}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#343A4080",
                }}
              >
                Através do wizard, escolheste o template xxxxxxxxx.
              </Typography>
              {!isEditingTemplate ? (
                <div style={{ display: "flex", gap: "4px" }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "#343A4080",
                    }}
                  >
                    Podes
                  </Typography>

                  <div onClick={editTemplate}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        color: "#343A4080",

                        textDecoration: "underline",
                        cursor: "pointer",
                      }}
                    >
                      alterar aqui
                    </Typography>
                  </div>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "#343A4080",
                    }}
                  >
                    a qualquer momento!
                  </Typography>
                </div>
              ) : (
                <div className={styles.edit_template_actions}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: "#343A4080",
                    }}
                  >
                    Quando acabares a edição clica em confirmar!
                  </Typography>

                  <div style={{ marginLeft: "42px" }}>
                    <Button
                      size="small"
                      type="red"
                      text="Cancelar"
                      onButtonClick={cancelEditTemplate}
                    />
                    <Button
                      size="small"
                      text="Confirmar"
                      onButtonClick={confirmEditTemplate}
                    />
                  </div>
                </div>
              )}
            </div>
            {episodeSegments && (
              <div className={styles.template_sequence_add_row}>
                <TemplateSequence
                  template={
                    !isEditingTemplate
                      ? episodeSegments
                      : tmpEditableEpisodeSegments
                  }
                  isDraggable={isEditingTemplate}
                  onDragEnd={onDragEnd}
                  actions={
                    isEditingTemplate
                      ? {
                          onRemoveTemplateSection: (id) => {
                            removeTemplateSection(id);
                          },
                        }
                      : {
                          onAdd: (id) => {
                            addAudioToSegment(id);
                          },
                          onRemove: (id) => {
                            removeAudioFromSegment(id);
                          },
                        }
                  }
                  selectedSegment={addAudioSegment?.ID}
                />
                {isEditingTemplate && (
                  <div
                    className={styles.template_sequence_add_row_button}
                    onClick={() => setAddTemplateCardModalOpen(true)}
                  >
                    <AddIcon sx={{ color: "#58C49B", fontSize: "128px" }} />
                  </div>
                )}
              </div>
            )}{" "}
          </div>

          {addAudioSegment && (
            <AudioNew
              type={addAudioSegment.type}
              handleConfirm={(audio, type) =>
                confirmAddAudioToSegment(audio, type)
              }
              handleCancel={cancelAddAudioToSegment}
            />
          )}

          {error && (
            <div className={styles.alert}>
              <Alert severity="error">
                Para podermos gerar o teu áudio, tens de ter todos os segmnetos
                com um áudio atribuido!
              </Alert>
            </div>
          )}

          {!addAudioSegment && (
            <div className={styles.actions}>
              <Button onButtonClick={onGoBack} type="red" text="Voltar atrás" />
              <Button onButtonClick={onRenderEpisode} text="Gerar Áudio" />
            </div>
          )}
        </>
      )}

      {addTemplateCardModalOpen && (
        <NewTemplateItemModal
          isOpen={addTemplateCardModalOpen}
          handleClose={() => setAddTemplateCardModalOpen(false)}
          handleConfirm={(cardType) => addTemplateSection(cardType)}
        />
      )}

      {episodeRenderModalOpen && (
        <EpisodeRenderModal
          isOpen={episodeRenderModalOpen}
          handleClose={() => setEpisodeRenderModalOpen(false)}
        />
      )}
    </div>
  );
}

export default EpisodeRecord;
