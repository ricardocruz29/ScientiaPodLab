import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  username: Yup.string().required("Campo obrigatório"),
  password: Yup.string()
    .min(5, "A password tem de ter no mínimo 6 caracteres")
    .required("Campo obrigatório"),
});

export const registrationValidationSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Campo obrigatório"),
  username: Yup.string().required("Campo obrigatório"),
  password: Yup.string()
    .min(6, "A password tem de ter no mínimo 6 caracteres")
    .required("Campo obrigatório"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "As passwords não correspondem.")
    .required("Campo obrigatório"),
});
