import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";

const Meals = (props) => {
  const [error, setError] = useState(null);
  // const [isLoading, setIsLoading] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  let urlParams = useParams();
  useEffect(() => {
    let isMounted = true;

    (async () => {
      // if (isMounted) setIsLoading(true);
      if (isMounted) setError(null);
      try {
        const response = await fetch(
          "https://food-order-app-d078d-default-rtdb.firebaseio.com/restaurants.json"
        );
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();

        const restaurantsArray = [];
        for (const property in data) {
          restaurantsArray.push({
            ...data[property],
          });
        }
        // console.log(restaurantsArray);
        const filteredRestaurantsArray = restaurantsArray.filter(
          (restaurant) => restaurant.id === `r${urlParams.id}`
        )[0];
        // console.log(filteredRestaurantsArray);

        if (isMounted) {
          setRestaurants(filteredRestaurantsArray);
          window.localStorage.setItem(
            "chosenRestaurant",
            JSON.stringify(filteredRestaurantsArray)
          );
        }
      } catch (e) {
        setError(e.message);
        alert(error);
      }
      // if (isMounted) setIsLoading(false);
    })();
    return () => {
      isMounted = false;
    };
  }, [urlParams.id, error]);

  return (
    <>
      <MealsSummary
        restaurantName={props.restaurantName}
        description={props.description}
        chosenRestaurant={restaurants}
      />

      <AvailableMeals
        restaurantId={props.restaurantId}
        restaurantName={props.restaurantName}
        chosenRestaurant={restaurants}
      />
    </>
  );
};

export default Meals;
