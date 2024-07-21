import { Formik, Form, Field } from "formik";
import { TextField, Typography } from "@mui/material";
import Button from "../../components/button/button";
import styles from "./register.module.css";
import { registrationValidationSchema } from "../../validators/auth.validator";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Register() {
  const { authenticate, authError } = useAuth();

  const onSubmit = async (values) => {
    const { username, email, password } = values;
    await authenticate({ username, email, password }, false);
  };

  return (
    <div className={styles.background}>
      <div className={styles.header}>
        <img src="/assets/logo.svg" alt="Logo" />
        <Typography variant="h2" sx={{ fontWeight: 700 }}>
          Bem Vindo!
        </Typography>
      </div>

      <div className={styles.form}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={registrationValidationSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form>
              <Field name="username">
                {({ field, meta }) => (
                  <TextField
                    type="text"
                    label="Username"
                    {...field}
                    fullWidth
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
              <Field name="email">
                {({ field, meta }) => (
                  <TextField
                    type="email"
                    label="Email"
                    {...field}
                    fullWidth
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>
              <Field name="password">
                {({ field, meta }) => (
                  <TextField
                    type="password"
                    label="Password"
                    {...field}
                    fullWidth
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>

              <Field name="confirmPassword">
                {({ field, meta }) => (
                  <TextField
                    type="password"
                    label="Confirmar Password"
                    {...field}
                    fullWidth
                    error={meta.touched && Boolean(meta.error)}
                    helperText={meta.touched && meta.error}
                  />
                )}
              </Field>

              <Typography variant="caption">
                Já possui uma conta? Clique{" "}
                <Link to="/login">
                  <Typography
                    variant="caption"
                    sx={{
                      textDecoration: "underline",
                      color: "#58C49B",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    aqui
                  </Typography>{" "}
                </Link>
                para fazer login!
              </Typography>

              <div className={styles.submit_button}>
                <Button btnType="submit" text="Registo"></Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Register;
