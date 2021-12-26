import { useState, useContext } from "react";
import { Formik, Form, Field } from "formik";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
//import Typography from "@mui/material/Typography";
//import { Link } from "react-router-dom";
import {
  makeStyles,
  //createMuiTheme,
  //ThemeProvider,
} from "@material-ui/core/styles";

import { SimpleFileUpload } from "formik-material-ui";
import Button from "@mui/material/Button";
import RestaurantContext from "../../store/restaurant-context";
import AuthContext from "../../store/auth-context";
import { getDatabase, ref, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const Photos = () => {
  const [showForm, setShowForm] = useState(false);

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

  const uploadImageHandler = async (value) => {
    const imageUrl = `restaurants/${restaurantCtx.chosenRestaurant.id}/${
      restaurantCtx.chosenRestaurant.id
    }-${Object.keys(restaurantCtx.chosenRestaurant.images).length + 1}.jpg`;
    const pathReference = storageRef(storage, imageUrl);
    await uploadBytes(pathReference, value.file).then((snapshot) => {});

    const URLforImage = await getDownloadURL(pathReference);
    await push(
      ref(db, `restaurants/${restaurantCtx.chosenRestaurant.id}/images`),
      URLforImage
    );
    restaurantCtx.addImage(restaurantCtx.chosenRestaurant.id, URLforImage);
  };
  const images = restaurantCtx.chosenRestaurant.images;
  let usersRestaurant =
    authCtx.isLoggedIn &&
    auth?.currentUser?.uid === restaurantCtx.chosenRestaurant.user;

  return (
    <>
      <Grid container spacing={2} mt={1} mb={2}>
        {Object.keys(images).map((image, index) => {
          return (
            <Grid item xs={4} key={index}>
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
                    <Chip label="Delete" color="error" size="small"></Chip>
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
