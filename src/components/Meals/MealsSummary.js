//import classes from "./MealsSummary.module.css";
import { useContext, useState, useEffect } from "react";
import RestaurantContext from "../../store/restaurant-context";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@material-ui/core";

const MealsSummary = (props) => {
  const restaurantCtx = useContext(RestaurantContext);
  //const restaurants = restaurantCtx.restaurants;
  const [chosenRestaurant, setChosenRestaurant] = useState({});
  let urlParams = useParams();

  useEffect(() => {
    // if (restaurantCtx.chosenRestaurant === "") {

    //   restaurantCtx.setChosenRestaurant({
    //     restaurants: restaurants,
    //     urlParams: urlParams,
    //   });
    // }
    const filteredContext = restaurantCtx.restaurants.filter(
      (restaurant) => restaurant.id === `r${urlParams.id}`
    );
    setChosenRestaurant(filteredContext[0]);
  }, [restaurantCtx.restaurants, urlParams.id]);

  const useStyles = makeStyles({
    paperContainer: {
      height: "100%",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "red",
      backgroundImage: `url(${chosenRestaurant.image})`,
      "&:hover": {
        backgroundColor: "white",
      },
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
  });

  const classes = useStyles();

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Paper
            //elevation={3}
            className={classes.paperContainer}
            elevation={6}
            //style={{ backgroundImage: `url(${chosenRestaurant.image})` }}
          >
            {/* <img src={chosenRestaurant.image} className={classes.image} /> */}
          </Paper>
          <div className={classes.overlay}>Images</div>
        </Grid>
        <Grid item xs={10}>
          <Paper elevation={6} className={classes.nameHeader}>
            <Box p={3}>
              <Typography align="left" variant="h3">
                {chosenRestaurant?.name}
              </Typography>
              <Typography align="left" variant="h5">
                {chosenRestaurant?.description}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MealsSummary;
