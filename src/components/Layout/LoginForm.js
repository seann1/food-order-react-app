import { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { Modal } from "../UI/Modal";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import AuthContext from "../../store/auth-context";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
//import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import classes from "./LoginForm.module.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "../../firebase/base";

const LoginForm = () => {
  //const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const auth = getAuth(firebaseApp);

  const authCtx = useContext(AuthContext);

  const submitHandler = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        // Signed in
        //const user = userCredential.user;
        console.log(userCredential.user);
        // ...
      })
      .catch((error) => {
        //const errorCode = error.code;
        //const errorMessage = error.message;
      });

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
        //setIsLoading(false);
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
        console.log(expirationTime.toISOString());
        authCtx.login(data.idToken, expirationTime.toISOString());
        history.push("/");
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
            .max(30, "Must be 15 characters or less")
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
            type="password"
          />
          <br />
          {/* onClick={props.onCancel} */}
          {/* className={classes.actions} */}
          <div className={classes.actions}>
            <Link to="/">
              <Button type="button" variant="contained" color="error">
                Cancel
              </Button>
            </Link>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </div>
        </Form>
      </Formik>
      <Box m={1}>
        <Alert severity="info">
          Log in with email: admin@admin.com password: password
        </Alert>
      </Box>
    </Modal>
  );
};

export default LoginForm;
