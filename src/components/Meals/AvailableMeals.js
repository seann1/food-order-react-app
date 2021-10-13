import { useState, useEffect, useContext, useCallback } from "react";
//import Marker from "../UI/Marker";
import MealItem from "./MealItem/MealItem";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@mui/material/Container";
import GoogleMapReact from "google-map-react";
import MapComponent from "../Maps/GoogleMap";
//import { GoogleMap, Marker, withGoogleMap } from "react-google-maps";
import RestaurantContext from "../../store/restaurant-context";
import { ClassNames } from "@emotion/react";
import Typography from "@mui/material/Typography";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = (props) => {
  const [error, setError] = useState(null);
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const restaurantCtx = useContext(RestaurantContext);

  const handleMouseOver = () => {
    setShowInfoWindow(true);
  };
  const handleMouseOut = () => {
    setShowInfoWindow(false);
  };

  const chosenRestaurant = restaurantCtx.restaurants.filter(
    (restaurant) => restaurant.id === props.restaurantId
  );
  console.log(chosenRestaurant[0].location.coordinates.lat);
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
        (meal) => meal.restaurantId === props.restaurantId
      );
      setMeals(filteredMealsArray);
      //console.log(mealsArray);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [props.restaurantId]);
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    // <section className={classes.meals}>
    //   <Card>{content}</Card>
    // </section>
    <Container>
      {content}

      <MapComponent
        chosenRestaurant={chosenRestaurant}
        containerElement={<div style={{ height: "50vh", width: "100%" }}></div>}
        mapElement={<div style={{ height: "50vh", width: "100%" }}></div>}
      ></MapComponent>
    </Container>
  );
};

export default AvailableMeals;
