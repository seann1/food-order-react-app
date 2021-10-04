import RestaurantContext from "./restaurant-context";

// const defaultRestaurantState = {
//   restaurantCount: 0,
//   restaurants: [],
// };

const RestaurantProvider = (props) => {
  const restaurantContext = {
    restaurantCount: 0,
    restaurants: [],
  };

  return (
    <RestaurantContext.Provider value={restaurantContext}>
      {props.children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantProvider;
