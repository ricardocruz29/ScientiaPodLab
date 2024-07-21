import { Formik, Form, Field } from "formik";
import { TextField, Typography } from "@mui/material";
import Button from "../../components/button/button";
import styles from "./login.module.css";
import { loginValidationSchema } from "../../validators/auth.validator";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Login() {
  const { authenticate, authError } = useAuth();

  const onSubmit = async (values) => {
    const { username, password } = values;
    await authenticate({ username, password });
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
            username: "",
            password: "",
          }}
          validationSchema={loginValidationSchema}
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

              <Typography variant="caption">
                Ainda não tem conta? Clique{" "}
                <Link to="/register">
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
                para se registar!
              </Typography>

              <div className={styles.submit_button}>
                <Button btnType="submit" text="Login"></Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
