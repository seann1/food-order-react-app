import React from "react";
const RestaurantContext = React.createContext({
  restaurantCount: 0,
  restaurants: [],
  updateCount: (count) => {},
  addRestaurant: (restaurant) => {},
});

export default RestaurantContext;
