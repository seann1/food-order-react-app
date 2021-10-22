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
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";

import { SimpleFileUpload } from "formik-material-ui";
import Button from "@mui/material/Button";
import RestaurantContext from "../../store/restaurant-context";
import { getDatabase, ref, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const Photos = (props) => {
  const [showForm, setShowForm] = useState(false);

  const restaurantCtx = useContext(RestaurantContext);
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
      // display: "block",
      // width: "100%",
      // height: "100%",
    },
    nameHeader: {
      backgroundColor: "grey",
      color: "white",
    },
    btn: {
      marginLeft: "1rem",
      // marginBottom: "1rem",
    },
  });
  const classes = useStyles();

  const uploadImageHandler = async (value) => {
    const imageUrl = `restaurants/${props.chosenRestaurant[0].id}/${
      props.chosenRestaurant[0].id
    }-${Object.keys(props.chosenRestaurant[0].image).length + 1}.jpg`;
    const pathReference = storageRef(storage, imageUrl);
    await uploadBytes(pathReference, value.file).then((snapshot) => {
      //console.log(pathReference);
    });

    const URLforImage = await getDownloadURL(pathReference);
    await push(
      ref(db, `restaurants/${props.chosenRestaurant[0].id}/images`),
      URLforImage
    );
    restaurantCtx.addImage(props.chosenRestaurant[0].id, URLforImage);
  };
  const images = props.chosenRestaurant[0].images;
  const userSignedIn =
    auth?.currentUser?.uid === props.chosenRestaurant[0].user;

  console.log(Object.keys(images).length);
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
                  {userSignedIn && (
                    <Chip label="Delete" color="error" size="small"></Chip>
                  )}
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
      {userSignedIn && (
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
