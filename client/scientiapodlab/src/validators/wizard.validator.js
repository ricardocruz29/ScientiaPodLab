import * as Yup from "yup";

export const planCreateValidationSchema = Yup.object({
  name: Yup.string().required("Campo obrigatório"),
  description: Yup.string().required("Campo obrigatório"),
  genre: Yup.string().required("Campo obrigatório"),
  target: Yup.string().required("Campo obrigatório"),
});

export const organizationCreateValidationSchema = Yup.object({
  template: Yup.string().required("Campo obrigatório"),
});
