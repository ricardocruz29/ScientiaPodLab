import { useEffect, useState } from "react";
import useAuthRedirect from "../../../../hooks/useAuthRedirect";
import useChangeActiveSidebar from "../../../../hooks/useChangeActiveSidebar";
import { useGetEpisodeQuery } from "../../../../redux/api/services/episodeService";
import styles from "./episode-record.module.css";
import { Typography, Skeleton } from "@mui/material";
import { useParams } from "react-router-dom";
import { useLazyGetTemplateQuery } from "../../../../redux/api/services/templateService";
import TemplateSequence from "../../../../components/templateSequence/templateSequence";
import { reorder } from "../../../../lib/utils/reorder";
import Button from "../../../../components/button/button";
import NewTemplateItemModal from "../../../../components/modals/newTemplateItem/newTemplateItem";
import AddIcon from "@mui/icons-material/Add";

function EpisodeRecord() {
  // Middlewares
  useAuthRedirect();
  useChangeActiveSidebar("podcasts");

  const { episodeId } = useParams();

  // Get data
  const { data: episode, isLoading } = useGetEpisodeQuery({
    episodeID: episodeId,
  });
  const [triggerGetTemplate, { data: template, isLoading: isLoadingTemplate }] =
    useLazyGetTemplateQuery();

  useEffect(() => {
    if (episode) {
      triggerGetTemplate({ templateID: episode.templateId });
    }
  }, [episode, triggerGetTemplate]);

  const [episodeSegments, setEpisodeSegments] = useState();
  const [tmpEditableEpisodeSegments, setTmpEditableEpisodeSegments] =
    useState();

  useEffect(() => {
    if (template) {
      const eSegments = [];
      template.segments.forEach((ts) => {
        eSegments.push({
          type: ts.type,
          position: ts.position,
          audio: undefined,
          ID: ts.ID,
        });
      });

      setEpisodeSegments(eSegments);
      setTmpEditableEpisodeSegments(eSegments);
    }
  }, [template]);

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
  const confirmEditTemplate = () => {
    setEpisodeSegments(tmpEditableEpisodeSegments);
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
    });

    setTmpEditableEpisodeSegments(items);

    setAddTemplateCardModalOpen(false);
  };

  const addAudioToSegment = (id) => {
    const segment = episodeSegments.find((es) => es.ID === id);

    console.log("segment: ", segment);
  };

  console.log("episode: ", episode);
  console.log("template: ", template);
  console.log("episodeSegments: ", episodeSegments);

  return (
    <div className={styles.page_container}>
      {(isLoading || isLoadingTemplate) && (
        <Skeleton variant="rectangular" width={1300} height={720} />
      )}
      {!isLoading && !isLoadingTemplate && episode && template && (
        <>
          <Typography
            variant="h4"
            sx={{ fontWeight: 600, marginBottom: "20px" }}
          >
            Grava o teu episódio - Construção
          </Typography>
          <Typography variant="body1" sx={{ color: "#343A4070" }}>
            Esta é a etapa para construíres o teu episódio. Oferecemos-te várias
            formas de construíres o teu episódio!!
          </Typography>
          <Typography variant="body1" sx={{ color: "#343A4070" }}>
            Importa um ficheiro de áudio, grava a tua voz aqui na plataforma ou
            experimenta a mais recente tecnologia de Text-to-Speech onde
            escreves o teu texto e nós geramos o áudio para ti!
          </Typography>
          <Typography variant="body1" sx={{ color: "#343A4070" }}>
            Vais ter um template para seguir, mas sente-te livre para fazeres
            tudo à tua maneira!
          </Typography>
          <Typography variant="body1" sx={{ color: "#343A4070" }}>
            Sente-te à vontade para utilizares os recursos que disponibilizámos
            na plataforma, faz experiências para ver se está ao teu agrado.
            Mesmo depois de finalizares, poderás voltar atrás para editar algum
            aspeto que não tenhas gostado.
          </Typography>

          <div className={styles.template_section}>
            <div className={styles.template_section_header}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: "#343A4080",
                  marginBottom: "12px",
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
                      marginBottom: "12px",
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
                        marginBottom: "12px",
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
                      marginBottom: "12px",
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
                      marginBottom: "12px",
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
                        }
                  }
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
            )}
          </div>
        </>
      )}
      {addTemplateCardModalOpen && (
        <NewTemplateItemModal
          isOpen={addTemplateCardModalOpen}
          handleClose={() => setAddTemplateCardModalOpen(false)}
          handleConfirm={(cardType) => addTemplateSection(cardType)}
        />
      )}
    </div>
  );
}

export default EpisodeRecord;
