import * as Yup from "yup";

export const duplicateTemplateValidationSchema = Yup.object({
  newTemplateName: Yup.string().required("Campo obrigatório"),
});

export const editTemplateValidationSchema = Yup.object({
  name: Yup.string().required("Campo obrigatório"),
  duration: Yup.string().required("Campo obrigatório"),
  genre: Yup.string().required("Campo obrigatório"),
});
