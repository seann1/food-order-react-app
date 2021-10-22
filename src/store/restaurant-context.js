import React from "react";
const RestaurantContext = React.createContext({
  restaurantCount: 0,
  restaurants: [],
  chosenRestaurant: "",
  updateCount: (count) => {},
  addRestaurant: (restaurant) => {},
  setChosenRestaurant: (restaurantObject) => {},
  addImage: (restaurantId, imageURL) => {},
});

export default RestaurantContext;
