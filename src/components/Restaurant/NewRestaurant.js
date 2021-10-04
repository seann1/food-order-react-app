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
//import storage from "../../firebase/base";
import { getDatabase, ref, set } from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
//import classes from "./NewRestaurant.module.css";

const NewRestaurant = () => {
  const restaurantCtx = useContext(RestaurantContext);
  const db = getDatabase();
  const storage = getStorage();
  const restaurantId = `r${restaurantCtx.restaurantCount + 1}`;
  const createRestaurantHandler = (values) => {
    const restaurantValues = {
      name: values.name,
      description: values.description,
      file: values.file,
      id: restaurantId,
    };
    console.log(restaurantValues);
    sendRestaurantFunction(restaurantValues);
  };

  const sendRestaurantFunction = async (values) => {
    const pathReference = storageRef(
      storage,
      `restaurants/${restaurantId}/${restaurantId}-1.jpg`
    );

    await uploadBytes(pathReference, values.file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });

    await getDownloadURL(pathReference).then((url) => {
      values.image = url;
      console.log(url);
    });

    await set(ref(db, "restaurants/" + values.id), {
      name: values.name,
      description: values.description,
      id: values.id,
      image: values.image,
    });

    const restaurantImageRef = storageRef(
      storage,
      `restaurants/${values.id}/${values.id}-1.jpg`
    );
    restaurantCtx.restaurantCount += 1;
    // try {
    //   const response = await fetch(
    //     `https://food-order-app-d078d-default-rtdb.firebaseio.com/restaurants/${values.id}.json`,
    //     {
    //       method: "POST",
    //       body: JSON.stringify({
    //         name: values.name,
    //         description: values.description,
    //         id: values.id,
    //       }),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );
    //   await response.json();
    //console.log(response.json());

    //   const fileRef = await storage.child(values.file.name);
    //   fileRef.put(values.file);
    //   await console.log("uploaded file", values.file.name);

    //   restaurantCtx.restaurantCount += 1;
    //   console.log(restaurantCtx.restaurantCount);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <Container>
      <Paper>
        <Box m={2}>
          <Formik
            initialValues={{
              name: "",
              description: "",
              file: null,
            }}
            validationSchema={Yup.object({
              name: Yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Required"),
              description: Yup.string()
                .max(500, "Must be 500 characters or less")
                .required("Required"),
            })}
            onSubmit={(values) => {
              createRestaurantHandler(values);
              //console.log(values);
            }}
          >
            <Form>
              <Field
                component={TextField}
                name="name"
                type="text"
                label="Name"
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
              <Field
                component={SimpleFileUpload}
                name="file"
                label="Simple File Upload"
                onChange={(event) => {
                  Formik.setFieldValue("file", event.currentTarget.files[0]);
                }}
              />

              {/* <div className={classes.actions}>
          </div> */}
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
