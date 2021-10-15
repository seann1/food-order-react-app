//import classes from "./MealsSummary.module.css";
import { useContext, useState, useEffect } from "react";
import RestaurantContext from "../../store/restaurant-context";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";

const MealsSummary = (props) => {
  const restaurantCtx = useContext(RestaurantContext);
  const restaurants = restaurantCtx.restaurants;
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
      (restaurant) => restaurant.id === urlParams.id
    );
    setChosenRestaurant(filteredContext[0]);
  }, []);

  return (
    <Container>
      <Paper elevation={3}>
        <Box p={3}>
          <Typography align="left" variant="h3">
            {chosenRestaurant.name}
          </Typography>
          <Typography align="left" variant="h6">
            {chosenRestaurant.description}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default MealsSummary;
