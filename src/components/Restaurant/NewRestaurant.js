import { useContext } from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, SimpleFileUpload } from "formik-material-ui";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import RestaurantContext from "../../store/restaurant-context";
import { useHistory } from "react-router-dom";
import { getDatabase, ref, set } from "firebase/database";
import { getAuth } from "firebase/auth";

import FormikPlacesFunction from "./FormikPlacesFunction";

import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

//import classes from "./NewRestaurant.module.css";

const NewRestaurant = (props) => {
  const restaurantCtx = useContext(RestaurantContext);

  const db = getDatabase();
  const auth = getAuth();
  const storage = getStorage();
  let history = useHistory();
  const restaurantId = `r${restaurantCtx.restaurants.length + 1}`;
  const createRestaurantHandler = (values) => {
    const restaurantValues = {
      name: values.name,
      description: values.description,
      file: values.file,
      location: values.location,
      id: restaurantId,
    };

    sendRestaurantFunction(restaurantValues);
  };

  const sendRestaurantFunction = async (values) => {
    let imageUrl;
    if (values.file) {
      imageUrl = `restaurants/${restaurantId}/${restaurantId}-1.jpg`;
    } else {
      imageUrl = "";
    }
    const pathReference = storageRef(storage, imageUrl);
    const newRestaurant = {
      name: values.name,
      description: values.description,
      id: values.id,
      location: values.location,
      image: values.file,
      dateCreated: +new Date(),
      user: auth.currentUser.uid,
    };
    if (imageUrl !== "") {
      await uploadBytes(pathReference, values.file).then((snapshot) => {
        //console.log(pathReference);
      });

      await getDownloadURL(pathReference).then((url) => {
        newRestaurant.image = url;
      });
    }

    await set(ref(db, "restaurants/" + values.id), newRestaurant);
    restaurantCtx.addRestaurant(newRestaurant);
    restaurantCtx.updateCount();
    history.push("/");
  };

  return (
    <Container>
      <Paper>
        <Box m={2}>
          <Formik
            initialValues={{
              name: "",
              description: "",
              location: "",
              file: null,
            }}
            validationSchema={Yup.object().shape({
              name: Yup.string()
                .max(100, "Must be 100 characters or less")
                .required("Required"),
              description: Yup.string()
                .max(500, "Must be 500 characters or less")
                .required("Required"),
              location: Yup.object().shape({
                value: Yup.string().required("Address is required"),
                address: Yup.string().required("Invalid address"),
              }),
            })}
            onSubmit={(values) => {
              createRestaurantHandler(values);
            }}
          >
            <Form>
              <Field
                component={TextField}
                name="name"
                type="text"
                label="Name"
                margin="normal"
                fullWidth
              />
              <br />

              <Field
                component={TextField}
                label="Description"
                name="description"
                type="text"
                multiline
                fullWidth
                minRows={4}
                maxRows={4}
              />
              <br />
              {/* <label name="Address">Address</label> */}
              {/* FormikPlacesAutoComplete */}
              <Field
                component={FormikPlacesFunction}
                name="location"
                options={{}}
              />
              <br />
              <Field
                component={SimpleFileUpload}
                name="file"
                label="Simple File Upload"
                onChange={(event) => {
                  Formik.setFieldValue("file", event.currentTarget.files[0]);
                }}
              />

              <Box m={2} mb={2}>
                <Button
                  type="button"
                  variant="contained"
                  color="error"
                  component={Link}
                  to={"/"}
                >
                  Cancel
                </Button>

                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Box>
            </Form>
          </Formik>
        </Box>
      </Paper>
    </Container>
  );
};

export default NewRestaurant;
