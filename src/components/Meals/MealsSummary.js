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

const MealsSummary = (props) => {
  // const [error, setError] = useState(null);
  // const [restaurants, setRestaurants] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const restaurantCtx = useContext(RestaurantContext);

  let match = useRouteMatch();

  //const restaurants = restaurantCtx.restaurants;
  // const [chosenRestaurant, setChosenRestaurant] = useState({});
  let urlParams = useParams();

  // useEffect(() => {
  //   let isMounted = true;

  //   (async () => {
  //     if (isMounted) setIsLoading(true);
  //     if (isMounted) setError(null);
  //     try {
  //       const response = await fetch(
  //         "https://food-order-app-d078d-default-rtdb.firebaseio.com/restaurants.json"
  //       );
  //       if (!response.ok) {
  //         throw new Error("Something went wrong!");
  //       }
  //       const data = await response.json();

  //       const restaurantsArray = [];
  //       for (const property in data) {
  //         restaurantsArray.push({
  //           id: data[property].id,
  //           name: data[property].name,
  //           description: data[property].description,
  //         });
  //       }

  //       const filteredRestaurantsArray = restaurantsArray.filter(
  //         (restaurant) => restaurant.id === `r${urlParams.id}`
  //       )[0];

  //       if (isMounted) {
  //         setRestaurants(filteredRestaurantsArray);
  //       }
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //     if (isMounted) setIsLoading(false);
  //     // fetchMealsHandler();
  //   })();
  //   return () => {
  //     isMounted = false;
  //   };
  // }, [urlParams.id]);

  const useStyles = makeStyles({
    paperContainer: {
      height: "100%",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundColor: "red",
      backgroundImage: `url(${props.chosenRestaurant.profileImage})`,
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
            <Box pb={3} pl={3} pr={3}>
              <Typography align="left" variant="h3">
                {props.chosenRestaurant.name}
              </Typography>
              <Typography align="left" variant="h5">
                {props.chosenRestaurant.description}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default MealsSummary;
