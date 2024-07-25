import useAuthRedirect from "../../../hooks/useAuthRedirect";
import useChangeActiveSidebar from "../../../hooks/useChangeActiveSidebar";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateTemplateMutation,
  useDeleteTemplateMutation,
  useGetTemplateQuery,
} from "../../../redux/api/services/templateService";
import styles from "./template.module.css";
import {
  Typography,
  TextField,
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { Skeleton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import DuplicateTemplateModal from "../../../components/modals/duplicateTemplate/duplicateTemplate";
import TemplateSequence from "../../../components/templateSequence/templateSequence";
import { Formik, Form, Field } from "formik";
import Button from "../../../components/button/button";
import { editTemplateValidationSchema } from "../../../validators/template.validator";
import { reorder } from "../../../lib/utils/reorder";

function Template() {
  const navigate = useNavigate();
  const [createTemplateMutation] = useCreateTemplateMutation();
  const [deleteTemplateMutation] = useDeleteTemplateMutation();

  //Middlewares
  useAuthRedirect();
  useChangeActiveSidebar("resources");

  const { id } = useParams();

  // Get data
  const { data, isLoading } = useGetTemplateQuery({ templateID: id });

  //TODO ------------------
  /*
  - Create big text for the description (constants with the respective description based on State of Art)
  - Edit -> Create modal to choose a new card (Create Component)
  - Edit -> Dispatch action to update the template
  */
  //TODO -------------------

  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false);
  const duplicateTemplate = async (newTemplateName) => {
    const { data: newTemplate } = await createTemplateMutation({
      name: newTemplateName,
      duration: data.duration,
      genre: data.genre,
      segments: data.segments.map((s) => {
        return {
          Position: s.position,
          type: s.type,
        };
      }),
    });

    navigate(`/resources/templates/${newTemplate.ID}`);

    setDuplicateModalOpen(false);
  };

  const deleteTemplate = () => {
    deleteTemplateMutation({ templateID: id });

    navigate("/resources");
  };

  const [isEditing, setIsEditing] = useState(false);
  const editTemplate = () => {};
  const [templateItems, setTemplateItems] = useState([]);
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      templateItems,
      result.source.index,
      result.destination.index
    );

    // Update on BE
    setTemplateItems(items);
  };
  const removeTemplateCard = (id) => {
    const items = [...templateItems];

    const removingIndex = items.findIndex((i) => i.ID === id);
    items.splice(removingIndex, 1);

    setTemplateItems(items);
  };

  console.log("Template Items: ", templateItems);

  useEffect(() => {
    if (data) {
      setTemplateItems(data.segments);
    }
  }, [data]);

  return (
    <>
      <div className={styles.page_container}>
        {isLoading && (
          <Skeleton variant="rectangular" width={1300} height={720} />
        )}
        {!isLoading && !isEditing && (
          <>
            <div className={styles.template_header}>
              <Typography variant="h4" sx={{ fontWeight: 600 }}>
                {data?.name}
              </Typography>
              <div className={styles.template_actions}>
                {data?.type !== "Platform" && (
                  <div
                    onClick={() => setIsEditing(true)}
                    style={{ backgroundColor: "#FCC419" }}
                    title="Editar"
                  >
                    <EditIcon sx={{ color: "#fff" }} fontSize="medium" />
                  </div>
                )}
                <div
                  onClick={() => {
                    setDuplicateModalOpen(true);
                  }}
                  style={{ backgroundColor: "#A8D9AA" }}
                  title="Duplicar"
                >
                  <ContentCopyIcon sx={{ color: "#fff" }} fontSize="medium" />
                </div>
                {data?.type !== "Platform" && (
                  <div
                    onClick={deleteTemplate}
                    style={{ backgroundColor: "#FD6773" }}
                    title="Apagar"
                  >
                    <DeleteIcon sx={{ color: "#fff" }} fontSize="medium" />
                  </div>
                )}
              </div>
            </div>

            <div className={styles.template_info}>
              <Typography
                variant="body1"
                sx={{ color: "#00000080", fontSize: "18px" }}
              >
                Duração: {data?.duration}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#00000080", fontSize: "18px" }}
              >
                Intro:{" "}
                {data?.segments.some((s) => s.type === "Intro") ? "Sim" : "Não"}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#00000080", fontSize: "18px" }}
              >
                Outro:{" "}
                {data?.segments.some((s) => s.type === "Outro") ? "Sim" : "Não"}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#00000080", fontSize: "18px" }}
              >
                TTS:{" "}
                {data?.segments.some((s) => s.type === "TTS") ? "Sim" : "Não"}
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#00000080", fontSize: "18px" }}
              >
                Tipo: {data?.genre}
              </Typography>
            </div>

            <div className={styles.template_sequence}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Sequência Sugerida
              </Typography>
              <TemplateSequence template={data?.segments} />
            </div>
          </>
        )}

        {!isLoading && isEditing && (
          <Formik
            initialValues={{
              name: data.name,
              duration: data.duration,
              genre: data.genre,
            }}
            validationSchema={editTemplateValidationSchema}
            onSubmit={editTemplate}
          >
            {() => (
              <Form>
                <div className={styles.template_header_edit}>
                  <Field name="name">
                    {({ field, meta }) => (
                      <TextField
                        type="text"
                        label="Nome"
                        fullWidth
                        {...field}
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                </div>

                <div className={styles.template_info_edit}>
                  <Field name="duration">
                    {({ field, meta }) => (
                      <TextField
                        type="text"
                        label="Duração"
                        placeholder="1min30s"
                        {...field}
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                      />
                    )}
                  </Field>
                  <Typography
                    variant="body1"
                    sx={{ color: "#00000080", fontSize: "18px" }}
                  >
                    Intro:{" "}
                    {data?.segments.some((s) => s.type === "Intro")
                      ? "Sim"
                      : "Não"}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#00000080", fontSize: "18px" }}
                  >
                    Outro:{" "}
                    {data?.segments.some((s) => s.type === "Outro")
                      ? "Sim"
                      : "Não"}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{ color: "#00000080", fontSize: "18px" }}
                  >
                    TTS:{" "}
                    {data?.segments.some((s) => s.type === "TTS")
                      ? "Sim"
                      : "Não"}
                  </Typography>

                  <Field name="genre">
                    {({ field, form, meta }) => (
                      <FormControl
                        fullWidth
                        error={meta.touched && Boolean(meta.error)}
                      >
                        <InputLabel id="category-label">Tipo</InputLabel>
                        <Select
                          fullWidth
                          labelId="category-label"
                          {...field}
                          label="Tipo"
                        >
                          <MenuItem value="monologue">Monólogo</MenuItem>
                          <MenuItem value="interview">Entrevista</MenuItem>
                          <MenuItem value="story">Story Tellying</MenuItem>
                        </Select>
                        {meta.touched && meta.error && (
                          <FormHelperText>{meta.error}</FormHelperText>
                        )}
                      </FormControl>
                    )}
                  </Field>
                </div>

                <div className={styles.template_sequence}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Sequência Sugerida
                  </Typography>
                  <TemplateSequence
                    template={templateItems}
                    isDraggable={true}
                    onDragEnd={onDragEnd}
                    actions={{
                      onRemoveTemplateSection: (id) => {
                        console.log("id: ", id);
                        removeTemplateCard(id);
                      },
                    }}
                  />
                </div>

                <div className={styles.buttons}>
                  <Button
                    onButtonClick={() => {
                      setTemplateItems(data.segments);
                      setIsEditing(false);
                    }}
                    type="red"
                    text="Cancelar"
                    size="small"
                  ></Button>
                  <Button
                    btnType="submit"
                    text="Confirmar"
                    size="small"
                  ></Button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
      {duplicateModalOpen && (
        <DuplicateTemplateModal
          originalTemplate={data}
          isOpen={duplicateModalOpen}
          handleClose={() => setDuplicateModalOpen(false)}
          handleConfirm={({ newTemplateName }) =>
            duplicateTemplate(newTemplateName)
          }
        />
      )}
    </>
  );
}

export default Template;
