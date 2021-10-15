import RestaurantContext from "./restaurant-context";
import { useReducer } from "react";

const defaultRestaurantState = {
  restaurantCount: 0,
  restaurants: [],
  chosenRestaurant: "",
};

const restaurantReducer = (state, action) => {
  if (action.type === "ADD_RESTAURANT") {
    return {
      chosenRestaurant: state.chosenRestaurant,
      restaurants: state.restaurants.concat(action.restaurant),
      restaurantCount: state.restaurantCount,
    };
  }

  if (action.type === "UPDATE_COUNT") {
    const updatedCount = state.restaurantCount + 1;

    return {
      chosenRestaurant: state.chosenRestaurant,
      restaurants: state.restaurants,
      restaurantCount: updatedCount,
    };
  }

  if (action.type === "CLEAR_RESTAURANTS") {
    return {
      chosenRestaurant: "",
      restaurants: [],
      restaurantCount: state.restaurantCount,
    };
  }

  if (action.type === "CHOOSE_RESTAURANT") {
    const chosenRestaurant = action.chosenRestaurant.restaurants.filter(
      (restaurant) => restaurant.id === action.chosenRestaurant.urlParams.id
    );
    return {
      chosenRestaurant: chosenRestaurant,
      restaurants: state.restaurants,
      restaurantCount: state.restaurantCount,
    };
  }
};
const RestaurantProvider = (props) => {
  const [restaurantState, dispatchRestaurantAction] = useReducer(
    restaurantReducer,
    defaultRestaurantState
  );

  const countUpdateHandler = (count) => {
    dispatchRestaurantAction({ type: "UPDATE_COUNT", count });
  };

  const restaurantAddHandler = (restaurant) => {
    dispatchRestaurantAction({
      type: "ADD_RESTAURANT",
      restaurant: restaurant,
    });
  };

  const chooseRestaurantHandler = (restaurantObject) => {
    dispatchRestaurantAction({
      type: "CHOOSE_RESTAURANT",
      chosenRestaurant: restaurantObject,
    });
  };

  const clearRestaurantsHandler = () => {
    dispatchRestaurantAction({ type: "CLEAR_RESTAURANTS" });
  };
  const restaurantContext = {
    restaurantCount: restaurantState.restaurantCount,
    restaurants: restaurantState.restaurants,
    updateCount: countUpdateHandler,
    addRestaurant: restaurantAddHandler,
    clearRestaurants: clearRestaurantsHandler,
    setChosenRestaurant: chooseRestaurantHandler,
    chosenRestaurant: restaurantState.chosenRestaurant,
  };

  return (
    <RestaurantContext.Provider value={restaurantContext}>
      {props.children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantProvider;
