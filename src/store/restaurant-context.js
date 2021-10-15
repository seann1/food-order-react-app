import React from "react";
const RestaurantContext = React.createContext({
  restaurantCount: 0,
  restaurants: [],
  chosenRestaurant: "",
  updateCount: (count) => {},
  addRestaurant: (restaurant) => {},
  setChosenRestaurant: (restaurantObject) => {},
});

export default RestaurantContext;
