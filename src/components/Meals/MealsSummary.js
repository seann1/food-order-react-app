//import classes from "./MealsSummary.module.css";
import { useContext } from "react";
import RestaurantContext from "../../store/restaurant-context";
import Paper from "@mui/material/Paper";

import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { useParams, Link, useRouteMatch } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

theme.typography.h3 = {
  fontSize: "1.6rem",
  color: "white",
  "@media (min-width:600px)": {
    fontSize: "2rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2.5rem",
  },
};

theme.typography.h5 = {
  fontSize: ".7rem",
  color: "white",
  "@media (min-width:600px)": {
    fontSize: "1rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "1.2rem",
  },
};

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
    },
    nameHeader: {
      backgroundColor: "grey",
      color: "white",
    },
  });

  const classes = useStyles();
  ///r${urlParams.id}
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4} md={2} sx={{ minHeight: "150px" }}>
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
        <Grid item xs={12} sm={8} md={10}>
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
    </ThemeProvider>
  );
};

export default MealsSummary;
