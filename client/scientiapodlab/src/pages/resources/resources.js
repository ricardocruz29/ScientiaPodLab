import useAuthRedirect from "../../hooks/useAuthRedirect";
import useChangeActiveSidebar from "../../hooks/useChangeActiveSidebar";
import {
  useDeleteResourceMutation,
  useGetResourcesQuery,
} from "../../redux/api/services/resourceService";
import {
  useCreateTemplateMutation,
  useDeleteTemplateMutation,
  useGetTemplatesQuery,
} from "../../redux/api/services/templateService";
import { Typography, Skeleton } from "@mui/material";
import styles from "./resources.module.css";
import { useEffect, useState } from "react";
import Card from "../../components/card/card";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import DuplicateTemplateModal from "../../components/modals/duplicateTemplate/duplicateTemplate";

function Resources() {
  const navigate = useNavigate();
  const [deleteTemplateMutation] = useDeleteTemplateMutation();
  const [deleteResourceMutation] = useDeleteResourceMutation();
  const [createTemplateMutation] = useCreateTemplateMutation();

  //Middlewares
  useAuthRedirect();
  useChangeActiveSidebar("resources");

  // Get data
  const { data: resources, isLoading: is_loading_resources } =
    useGetResourcesQuery();
  const { data: templates, isLoading: is_loading_templates } =
    useGetTemplatesQuery();

  //Filters
  const [filter, setFilter] = useState();
  const [deletedResources, setDeletedResources] = useState([]);
  const [filtered_data, set_filtered_data] = useState({
    templates: [],
    sound_effects: [],
    tts: [],
  });

  useEffect(() => {
    let filtered_templates = [];
    let filtered_sound_effects = [];
    let filtered_tts = [];

    if (templates) {
      filtered_templates = filter
        ? templates.filter(
            (resource) =>
              resource.type === filter &&
              !deletedResources.includes(resource.ID)
          )
        : templates.filter(
            (resource) => !deletedResources.includes(resource.ID)
          );
    }

    if (resources) {
      filtered_sound_effects = filter
        ? resources.filter(
            (resource) =>
              resource.type_segment === "SoundEffect" &&
              resource.type === filter &&
              !deletedResources.includes(resource.ID)
          )
        : resources.filter(
            (resource) =>
              resource.type_segment === "SoundEffect" &&
              !deletedResources.includes(resource.ID)
          );

      filtered_tts = filter
        ? resources.filter(
            (resource) =>
              resource.type_segment === "TTS" &&
              resource.type === filter &&
              !deletedResources.includes(resource.ID)
          )
        : resources.filter(
            (resource) =>
              resource.type_segment === "TTS" &&
              !deletedResources.includes(resource.ID)
          );
    }

    set_filtered_data({
      templates: filtered_templates,
      sound_effects: filtered_sound_effects,
      tts: filtered_tts,
    });
  }, [resources, templates, filter, deletedResources]);

  const toggleFilter = (newFilter) => {
    if (newFilter === filter) {
      setFilter(undefined);
    } else {
      setFilter(newFilter);
    }
  };

  const deleteResource = (type, id) => {
    if (type === "Template") {
      deleteTemplateMutation({ templateID: id });
    }

    if (type === "Resource") {
      deleteResourceMutation({ resourceID: id });
    }

    const tmpDeletedResources = [...deletedResources];
    tmpDeletedResources.push(id);
    setDeletedResources(tmpDeletedResources);
  };

  const [duplicateModalData, setDuplicateModalData] = useState();
  const duplicateTemplate = async (newTemplateName) => {
    const { data: newTemplate } = await createTemplateMutation({
      name: newTemplateName,
      duration: duplicateModalData.duration,
      genre: duplicateModalData.genre,
      segments: duplicateModalData.segments.map((s) => {
        return {
          Position: s.position,
          type: s.type,
        };
      }),
    });

    navigate(`/resources/templates/${newTemplate.ID}`);

    setDuplicateModalData();
  };

  return (
    <>
      <div className={styles.page_container}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Os Meus Recursos
        </Typography>
        <div className={styles.filters}>
          <div className={styles.filter} onClick={() => toggleFilter("Custom")}>
            <div
              className={`${styles.filter_green} ${
                filter === "Custom" && styles.filter_active
              }`}
            ></div>
            <Typography variant="body">Customizado</Typography>
          </div>
          <div
            className={styles.filter}
            onClick={() => toggleFilter("Platform")}
          >
            <div
              className={`${styles.filter_red} ${
                filter === "Platform" && styles.filter_active
              }`}
            ></div>
            <Typography variant="body">Sistema</Typography>
          </div>
        </div>
        <section className={styles.resources_section}>
          {is_loading_templates && (
            <>
              <Typography
                variant="h6"
                sx={{ fontWeight: 500, color: "#343A40" }}
              >
                Templates
              </Typography>
              <div className={styles.resources_row}>
                <Skeleton variant="rectangular" width={200} height={225} />
                <Skeleton variant="rectangular" width={200} height={225} />
                <Skeleton variant="rectangular" width={200} height={225} />
                <Skeleton variant="rectangular" width={200} height={225} />
                <Skeleton variant="rectangular" width={200} height={225} />
                <Skeleton variant="rectangular" width={200} height={225} />
              </div>
            </>
          )}
          {!is_loading_templates && filtered_data.templates && (
            <>
              <Typography
                variant="h6"
                sx={{ fontWeight: 500, color: "#343A40" }}
              >
                Templates
              </Typography>
              <div className={styles.resources_row}>
                {filtered_data.templates?.map((resource) => {
                  return (
                    <div key={resource.ID} className={styles.resource_item}>
                      <Card
                        type="template"
                        data={{
                          title: resource.name,
                          duration: resource.duration,
                          type: resource.genre,
                          hasIntro: resource.segments.some(
                            (s) => s.type === "Intro"
                          ),
                          hasOutro: resource.segments.some(
                            (s) => s.type === "Outro"
                          ),
                          hasTTS: resource.segments.some(
                            (s) => s.type === "TTS"
                          ),
                          template: resource.segments,
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
                                navigate(`/resources/templates/${resource.ID}`);
                              },
                            },
                            {
                              icon: (
                                <ContentCopyIcon
                                  sx={{ color: "#fff" }}
                                  fontSize="small"
                                />
                              ),
                              background: "#A8D9AA",
                              action: () => {
                                setDuplicateModalData(resource);
                              },
                            },
                            resource.type !== "Platform" && {
                              icon: (
                                <DeleteIcon
                                  sx={{ color: "#fff" }}
                                  fontSize="small"
                                />
                              ),
                              background: "#FD6773",
                              action: () => {
                                deleteResource("Template", resource.ID);
                              },
                            },
                          ],
                        }}
                      />
                      <div
                        className={`${styles.filter_card} ${
                          resource.type === "Platform" && styles.filter_red
                        } ${resource.type === "Custom" && styles.filter_green}`}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </section>
        <section className={styles.resources_section}>
          {is_loading_resources && (
            <>
              <Typography
                variant="h6"
                sx={{ fontWeight: 500, color: "#343A40" }}
              >
                Efeitos Sonoros
              </Typography>
              <div className={styles.resources_row}>
                <Skeleton variant="rectangular" width={200} height={225} />
                <Skeleton variant="rectangular" width={200} height={225} />
                <Skeleton variant="rectangular" width={200} height={225} />
                <Skeleton variant="rectangular" width={200} height={225} />
                <Skeleton variant="rectangular" width={200} height={225} />
                <Skeleton variant="rectangular" width={200} height={225} />
              </div>
            </>
          )}
          {!is_loading_resources && filtered_data.sound_effects && (
            <>
              <Typography variant="h6">Efeitos Sonoros</Typography>
              <div className={styles.resources_row}>
                {filtered_data.sound_effects?.map((resource) => {
                  return (
                    <div key={resource.ID} className={styles.resource_item}>
                      <Card
                        type="audio"
                        data={{
                          title: resource.name,
                          audioFile: resource.url,
                          actions: [
                            resource.type !== "Platform" && {
                              icon: (
                                <DeleteIcon
                                  sx={{ color: "#fff" }}
                                  fontSize="small"
                                />
                              ),
                              background: "#FD6773",
                              action: () => {
                                deleteResource("Resource", resource.ID);
                              },
                            },
                          ],
                        }}
                      ></Card>
                      <div
                        className={`${styles.filter_card} ${
                          resource.type === "Platform" && styles.filter_red
                        } ${resource.type === "Custom" && styles.filter_green}`}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </section>
        <section className={styles.resources_section}>
          {is_loading_resources && (
            <>
              <Typography variant="h6">TTS</Typography>
              <div className={styles.resources_row}>
                <Skeleton variant="rectangular" width={200} height={225} />
                <Skeleton variant="rectangular" width={200} height={225} />
                <Skeleton variant="rectangular" width={200} height={225} />
                <Skeleton variant="rectangular" width={200} height={225} />
                <Skeleton variant="rectangular" width={200} height={225} />
                <Skeleton variant="rectangular" width={200} height={225} />
              </div>
            </>
          )}
          {!is_loading_resources && filtered_data.tts && (
            <>
              <Typography variant="h6">TTS</Typography>
              <div className={styles.resources_row}>
                {filtered_data.tts?.map((resource) => {
                  return (
                    <div key={resource.ID} className={styles.resource_item}>
                      <Card
                        type="audio"
                        data={{
                          title: resource.name,
                          audioFile: resource.url,
                          actions: [
                            resource.type !== "Platform" && {
                              icon: (
                                <DeleteIcon
                                  sx={{ color: "#fff" }}
                                  fontSize="small"
                                />
                              ),
                              background: "#FD6773",
                              action: () => {
                                deleteResource("Resource", resource.ID);
                              },
                            },
                          ],
                        }}
                      ></Card>
                      <div
                        className={`${styles.filter_card} ${
                          resource.type === "Platform" && styles.filter_red
                        } ${resource.type === "Custom" && styles.filter_green}`}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </section>
      </div>
      {duplicateModalData && (
        <DuplicateTemplateModal
          originalTemplate={duplicateModalData}
          isOpen={duplicateModalData !== undefined}
          handleClose={() => setDuplicateModalData(undefined)}
          handleConfirm={({ newTemplateName }) =>
            duplicateTemplate(newTemplateName)
          }
        />
      )}
    </>
  );
}

export default Resources;
