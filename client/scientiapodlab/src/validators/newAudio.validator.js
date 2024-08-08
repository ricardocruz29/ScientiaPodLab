import * as Yup from "yup";

export const newAudioNameValidationSchema = Yup.object({
  name: Yup.string().required("Campo obrigatório"),
});

export const newAudioTTSValidationSchema = Yup.object({
  name: Yup.string().required("Campo obrigatório"),
  text: Yup.string()
    .min(10, "O texto tem de ter no mínimo 10 caracteres")
    .required("Campo obrigatório"),
});
