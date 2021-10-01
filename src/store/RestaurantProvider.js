//import { useReducer } from "react";

import RestaurantContext from "./restaurant-context";

const defaultRestaurantState = {
  restaurantCount: 0,
};

// const restaurantReducer = (state, action) => {
//   if (action.type === "R_Count") {

//   }
// };

const RestaurantProvider = (props) => {
  const restaurantContext = {
    restaurantCount: 0,
  };

  return (
    <RestaurantContext.Provider value={restaurantContext}>
      {props.children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantProvider;
