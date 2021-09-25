import { useState, useContext } from "react";
import { Modal } from "../UI/Modal";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import AuthContext from "../../store/auth-context";
import classes from "./LoginForm.module.css";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const submitHandler = (values) => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDR64c87WSnLF6Pn6MiL6hyukSOKNdqhZ8",
      {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString());
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <Modal>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          password: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
        })}
        onSubmit={(values) => {
          submitHandler(values);
        }}
      >
        <Form>
          <Field component={TextField} name="email" type="text" label="Email" />
          <br />
          <Field
            component={TextField}
            label="Password"
            name="password"
            type="text"
          />
          <br />
          {/* onClick={props.onCancel} */}
          <div className={classes.actions}>
            <button type="button">Cancel</button>
            <button type="submit" className={classes.submit}>
              Submit
            </button>
          </div>
        </Form>
      </Formik>
    </Modal>
  );
};

export default LoginForm;
