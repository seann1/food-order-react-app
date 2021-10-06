import RestaurantContext from "./restaurant-context";
import { useReducer } from "react";

const defaultRestaurantState = {
  restaurantCount: 0,
  restaurants: [],
};

const restaurantReducer = (state, action) => {
  if (action.type === "ADD_RESTAURANT") {
    return {
      restaurants: state.restaurants.concat(action.restaurant),
      restaurantCount: state.restaurantCount,
    };
  }

  if (action.type === "UPDATE_COUNT") {
    const updatedCount = state.restaurantCount + 1;

    return {
      restaurants: state.restaurants,
      restaurantCount: updatedCount,
    };
  }

  if (action.type === "CLEAR_RESTAURANTS") {
    return {
      restaurants: [],
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

  const clearRestaurantsHandler = () => {
    dispatchRestaurantAction({ type: "CLEAR_RESTAURANTS" });
  };
  const restaurantContext = {
    restaurantCount: restaurantState.restaurantCount,
    restaurants: restaurantState.restaurants,
    updateCount: countUpdateHandler,
    addRestaurant: restaurantAddHandler,
    clearRestaurants: clearRestaurantsHandler,
  };

  return (
    <RestaurantContext.Provider value={restaurantContext}>
      {props.children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantProvider;
