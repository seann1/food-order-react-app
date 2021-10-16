import { useState, useEffect, useContext, useCallback } from "react";

import MealItem from "./MealItem/MealItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import MapComponent from "../Maps/GoogleMap";
import { useParams, Route } from "react-router-dom";
import RestaurantContext from "../../store/restaurant-context";
// import { ClassNames } from "@emotion/react";
// import Typography from "@mui/material/Typography";
// import classes from "./AvailableMeals.module.css";

const AvailableMeals = (props) => {
  const [error, setError] = useState(null);
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //const [showInfoWindow, setShowInfoWindow] = useState(false);
  const restaurantCtx = useContext(RestaurantContext);
  let urlParams = useParams();

  // const handleMouseOver = () => {
  //   setShowInfoWindow(true);
  // };
  // const handleMouseOut = () => {
  //   setShowInfoWindow(false);
  // };

  const chosenRestaurant = restaurantCtx.restaurants.filter(
    (restaurant) => restaurant.id === `r${urlParams.id}`
  );

  const fetchMealsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://food-order-app-d078d-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      const mealsArray = [];
      for (const property in data) {
        mealsArray.push({
          id: property,
          name: data[property].name,
          description: data[property].description,
          price: data[property].price,
          restaurantId: data[property].restaurantId,
          restaurantName: data[property].restaurantName,
        });
      }
      const filteredMealsArray = mealsArray.filter(
        (meal) => meal.restaurantId === `r${urlParams.id}`
      );
      setMeals(filteredMealsArray);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [urlParams.id]);
  useEffect(() => {
    fetchMealsHandler();
  }, [fetchMealsHandler]);

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
      restaurantId={meal.restaurantId}
      restaurantName={meal.restaurantName}
    />
  ));
  let content;
  if (meals.length > 0) {
    content = <div>{mealsList}</div>;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = (
      <Box m={2}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </div>
      </Box>
    );
  }

  return (
    // <section className={classes.meals}>
    //   <Card>{content}</Card>
    // </section>
    <Container>
      {content}
      <Route path="/r:id">
        <Box mt={2}>
          <MapComponent
            chosenRestaurant={chosenRestaurant}
            containerElement={
              <div style={{ height: "50vh", width: "100%" }}></div>
            }
            mapElement={<div style={{ height: "50vh", width: "100%" }}></div>}
          ></MapComponent>
        </Box>
      </Route>
    </Container>
  );
};

export default AvailableMeals;
