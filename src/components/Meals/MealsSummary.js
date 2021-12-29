//import classes from "./MealsSummary.module.css";
import { useContext } from "react";
import RestaurantContext from "../../store/restaurant-context";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { useParams, Link, useRouteMatch } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";

const MealsSummary = () => {
  const restaurantCtx = useContext(RestaurantContext);
  let match = useRouteMatch();

  //const restaurants = restaurantCtx.restaurants;
  // const [chosenRestaurant, setChosenRestaurant] = useState({});
  let urlParams = useParams();

  // useEffect(() => {
  //   // if (restaurantCtx.chosenRestaurant === "") {

  //   //   restaurantCtx.setChosenRestaurant({
  //   //     restaurants: restaurants,
  //   //     urlParams: urlParams,
  //   //   });
  //   // }
  //   const filteredContext = restaurantCtx.restaurants.filter(
  //     (restaurant) => restaurant.id === `r${urlParams.id}`
  //   );
  //   setChosenRestaurant(filteredContext[0]);
  // }, [restaurantCtx.restaurants, urlParams.id]);

  const useStyles = makeStyles({
    paperContainer: {
      height: "100%",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "red",
      backgroundImage: `url(${restaurantCtx.chosenRestaurant.profileImage})`,
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
  ///r${urlParams.id}
  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Link
          to={
            match.path === "/r:id"
              ? `r${urlParams.id}/photos`
              : `/r${urlParams.id}`
          }
        >
          <Tooltip
            title={match.path === "/r:id" ? "View Photos" : "Back to Menu"}
            placement="bottom-start"
          >
            <Paper className={classes.paperContainer} elevation={6}></Paper>
          </Tooltip>
        </Link>
        <div className={classes.overlay}>Images</div>
      </Grid>
      <Grid item xs={10}>
        <Paper elevation={6} className={classes.nameHeader}>
          <Box p={3}>
            <Typography align="left" variant="h3">
              {restaurantCtx.chosenRestaurant?.name}
            </Typography>
            <Typography align="left" variant="h5">
              {restaurantCtx.chosenRestaurant?.description}
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default MealsSummary;
