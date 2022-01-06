import { useState, useEffect, useContext } from "react";

import MealItem from "./MealItem/MealItem";

import Photos from "./Photos";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import MapComponent from "../Maps/GoogleMap";
import Grid from "@mui/material/Grid";
import { useParams, Route } from "react-router-dom";
import RestaurantContext from "../../store/restaurant-context";

const AvailableMeals = (props) => {
  const [error, setError] = useState(null);
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //const [showInfoWindow, setShowInfoWindow] = useState(false);
  const restaurantCtx = useContext(RestaurantContext);
  let urlParams = useParams();
  //let match = useRouteMatch();

  // const handleMouseOver = () => {
  //   setShowInfoWindow(true);
  // };
  // const handleMouseOut = () => {
  //   setShowInfoWindow(false);
  // };

  const chosenRestaurant = restaurantCtx.restaurants.filter(
    (restaurant) => restaurant.id === `r${urlParams.id}`
  );
  useEffect(() => {
    let isMounted = true;

    (async () => {
      if (isMounted) setIsLoading(true);
      if (isMounted) setError(null);
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

        if (isMounted) setMeals(filteredMealsArray);
      } catch (error) {
        setError(error.message);
      }
      if (isMounted) setIsLoading(false);
    })();
    return () => {
      isMounted = false;
    };
  }, [urlParams.id]);

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
    <>
      <Route path="/r:id/photos">
        <Photos chosenRestaurant={props.chosenRestaurant} />
      </Route>
      <Route path="/r:id" exact>
        {content}
      </Route>
      <Route path={["/r:id", "/r:id/photos"]} exact>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <MapComponent
              chosenRestaurant={chosenRestaurant}
              containerElement={
                <div style={{ height: "50vh", width: "100%" }}></div>
              }
              mapElement={<div style={{ height: "50vh", width: "100%" }}></div>}
            ></MapComponent>
          </Grid>
          <Grid item xs={4}>
            {/* <Reviews restaurant={chosenRestaurant} /> */}
          </Grid>
        </Grid>
      </Route>
    </>
  );
};

export default AvailableMeals;
