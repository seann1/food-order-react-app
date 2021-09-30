import MealsSummary from "./MealsSummary";
import AvailableMeals from "./AvailableMeals";
//import Box from "@mui/material/Box";

const Meals = (props) => {
  return (
    <>
      <MealsSummary
        restaurantName={props.restaurantName}
        description={props.description}
      />

      <AvailableMeals
        restaurantId={props.restaurantId}
        restaurantName={props.restaurantName}
      />
    </>
  );
};

export default Meals;
