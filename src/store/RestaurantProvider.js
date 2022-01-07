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
    // const chosenRestaurant = action.chosenRestaurant.restaurants.filter(
    //   (restaurant) => restaurant.id === action.chosenRestaurant.urlParams.id
    // );
    return {
      chosenRestaurant: action.chosenRestaurant,
      restaurants: state.restaurants,
      restaurantCount: state.restaurantCount,
    };
  }
  if (action.type === "ADD_IMAGE") {
    // const restaurant = state.restaurants.find(
    //   (restaurant) => restaurant.id === action.newImageObject.restaurantId
    // );

    const updatedRestaurant = state.restaurants.find((restaurant) => {
      return restaurant.id === action.newImageObject.restaurantId;
    });
    console.log(action.newImageObject.imageUrl);

    //const imageUuid = uuidv4();
    updatedRestaurant.images[action.newImageObject.imageUuid] =
      action.newImageObject.imageUrl;

    const filteredRestaurants = state.restaurants.filter(
      (obj) => obj.id !== action.newImageObject.restaurantId
    );

    const updatedRestaurants = filteredRestaurants.concat(updatedRestaurant);
    window.localStorage.setItem(
      "chosenRestaurant",
      JSON.stringify(updatedRestaurant)
    );
    return {
      chosenRestaurant: updatedRestaurant,
      restaurants: updatedRestaurants,
      restaurantCount: state.restaurantCount,
    };
  }
  if (action.type === "DELETE_IMAGE") {
    const chosenRestaurant = state.restaurants.find((restaurant) => {
      return restaurant.id === action.deleteImageObject.restaurantId;
    });
    console.log(action);
    delete chosenRestaurant.images[action.deleteImageObject.image];
    console.log(chosenRestaurant.images);
    window.localStorage.setItem(
      "chosenRestaurant",
      JSON.stringify(chosenRestaurant)
    );
    const filteredRestaurants = state.restaurants.filter(
      (obj) => obj.id !== action.deleteImageObject.restaurantId
    );
    const updatedRestaurants = filteredRestaurants.concat(chosenRestaurant);

    return {
      chosenRestaurant: chosenRestaurant,
      restaurants: updatedRestaurants,
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

  const addImageHandler = (restaurantId, imageUrl, imageUuid) => {
    const newImageObject = { restaurantId, imageUrl, imageUuid };
    dispatchRestaurantAction({
      type: "ADD_IMAGE",
      newImageObject,
    });
  };

  const deleteImageHandler = (restaurantId, image, url) => {
    const deleteImageObject = { restaurantId, image, url };
    dispatchRestaurantAction({
      type: "DELETE_IMAGE",
      deleteImageObject,
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
    addImage: addImageHandler,
    deleteImage: deleteImageHandler,
    chosenRestaurant: restaurantState.chosenRestaurant,
  };

  return (
    <RestaurantContext.Provider value={restaurantContext}>
      {props.children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantProvider;
