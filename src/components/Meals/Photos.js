import { useState, useEffect, useContext } from "react";
import { Formik, Form, Field } from "formik";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";

import { makeStyles } from "@mui/styles";
import { v4 as uuidv4 } from "uuid";
import { SimpleFileUpload } from "formik-material-ui";
import Button from "@mui/material/Button";
import RestaurantContext from "../../store/restaurant-context";
import AuthContext from "../../store/auth-context";
import { getDatabase, ref, push, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const Photos = () => {
  const [showForm, setShowForm] = useState(false);
  const [images, setImages] = useState("");
  const restaurantCtx = useContext(RestaurantContext);
  const authCtx = useContext(AuthContext);

  const db = getDatabase();
  const auth = getAuth();

  const storage = getStorage();

  const useStyles = makeStyles({
    paperContainer: {
      height: "15em",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    overlay: {
      position: "absolute",
      top: "20px",
      left: "20px",
      color: "black",
      backgroundColor: "white",
    },
    image: {
      left: "0px",
      right: "0px",
      top: "0px",
      bottom: "0px",
    },
    nameHeader: {
      backgroundColor: "grey",
      color: "white",
    },
    btn: {
      marginLeft: "1rem",
    },
  });
  const classes = useStyles();
  useEffect(() => {
    setImages(JSON.parse(localStorage.getItem("chosenRestaurant")).images);
  }, []);

  const deleteImageHandler = async (restaurantId, image, url) => {
    let restaurantPhotos = JSON.parse(
      window.localStorage.getItem("chosenRestaurant")
    );

    const filteredImages = restaurantPhotos.images.filter(
      (photo) => photo !== url
    );
    restaurantPhotos.images = filteredImages;

    setImages(filteredImages);
    window.localStorage.setItem(
      "chosenRestaurant",
      JSON.stringify(restaurantPhotos)
    );

    restaurantCtx.deleteImage(restaurantId, image, url);

    await remove(
      ref(
        db,
        `restaurants/${restaurantCtx.chosenRestaurant.id}/images/${image}`
      )
    );
  };
  const uploadImageHandler = async (value) => {
    const imageUuid = uuidv4();
    const imageUrl = `restaurants/${restaurantCtx.chosenRestaurant.id}/${imageUuid}.jpg`;

    const pathReference = storageRef(storage, imageUrl);
    await uploadBytes(pathReference, value.file).then(() => {});

    const URLforImage = await getDownloadURL(pathReference);
    await push(
      ref(db, `restaurants/${restaurantCtx.chosenRestaurant.id}/images`),
      URLforImage
    );

    console.log(JSON.parse(window.localStorage.getItem("chosenRestaurant")).id);
    restaurantCtx.addImage(
      JSON.parse(window.localStorage.getItem("chosenRestaurant")).id,
      URLforImage,
      imageUuid
    );
  };

  let usersRestaurant =
    authCtx.isLoggedIn &&
    auth?.currentUser?.uid ===
      JSON.parse(window.localStorage.getItem("chosenRestaurant")).user;

  return (
    <>
      <Grid container spacing={2} mt={1} mb={2}>
        {Object.keys(images).map((image, index) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper
                className={classes.paperContainer}
                style={{
                  backgroundImage: `url(${images[image]})`,
                }}
                elevation={6}
                key={index}
              >
                <Box p={1}>
                  {usersRestaurant && (
                    <Chip
                      label="Delete"
                      color="error"
                      size="small"
                      onClick={() =>
                        deleteImageHandler(
                          JSON.parse(
                            window.localStorage.getItem("chosenRestaurant")
                          ).id,
                          image,
                          images[image]
                        )
                      }
                    ></Chip>
                  )}
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      {usersRestaurant && (
        <Grid container spacing={2}>
          <Grid item xs={4}>
            {showForm ? (
              <Paper elevation={6}>
                <Box mb={2} p={2}>
                  <Formik
                    initialValues={{
                      file: null,
                    }}
                    onSubmit={(value) => {
                      uploadImageHandler(value);
                    }}
                  >
                    <Form>
                      <Field
                        component={SimpleFileUpload}
                        name="file"
                        label="Simple File Upload"
                        onChange={(event) => {
                          Formik.setFieldValue(
                            "file",
                            event.currentTarget.files[0]
                          );
                        }}
                      />
                      <Box mt={2} pb={2} mr={2}>
                        <Button
                          type="button"
                          variant="contained"
                          color="error"
                          onClick={() => setShowForm(!showForm)}
                        >
                          Cancel
                        </Button>

                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          className={classes.btn}
                        >
                          Submit
                        </Button>
                      </Box>
                    </Form>
                  </Formik>
                </Box>
              </Paper>
            ) : (
              <Box mb={2}>
                <Button
                  variant="contained"
                  onClick={() => setShowForm(!showForm)}
                >
                  Add Photo
                </Button>
              </Box>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
};
export default Photos;
