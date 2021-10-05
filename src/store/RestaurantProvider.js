import RestaurantContext from "./restaurant-context";
import { useReducer } from "react";

const defaultRestaurantState = {
  restaurantCount: 0,
  restaurants: [],
};

const restaurantReducer = (state, action) => {
  if (action.type === "ADD_RESTAURANT") {
    console.log("action", action);
    console.log("state", state);
    const updatedRestaurants = state.restaurants.concat(action.restaurant);
    return {
      restaurants: updatedRestaurants,
      restaurantCount: state.restaurantCount,
    };
  }

  if (action.type === "UPDATE_COUNT") {
    //console.log("stateCount", state.restaurantCount);
    const updatedCount = state.restaurantCount + 1;
    //console.log("updatedCount", updatedCount);
    return {
      restaurants: state.restaurants,
      restaurantCount: updatedCount,
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
    //console.log("restaurant", restaurant);
    dispatchRestaurantAction({
      type: "ADD_RESTAURANT",
      restaurant: restaurant,
    });
  };
  const restaurantContext = {
    restaurantCount: restaurantState.restaurantCount,
    restaurants: restaurantState.restaurants,
    updateCount: countUpdateHandler,
    addRestaurant: restaurantAddHandler,
  };

  return (
    <RestaurantContext.Provider value={restaurantContext}>
      {props.children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantProvider;
