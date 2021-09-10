import { useState, useEffect, useCallback } from "react";

import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [error, setError] = useState(null);
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMealsHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://food-order-app-d078d-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      const mealsArray = [];
      for (const property in data) {
        mealsArray.push({
          id: property,
          name: data[property].name,
          description: data[property].description,
          price: data[property].price,
        });
      }
      setMeals(mealsArray);
      //console.log(mealsArray);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);
  useEffect(() => {
    fetchMealsHandler();
  }, [fetchMealsHandler]);
  //console.log(DUMMY_MEALS);
  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));
  let content;
  if (meals.length > 0) {
    content = <ul>{mealsList}</ul>;
  }
  if (error) {
    content = <p>{error}</p>;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  return (
    <section className={classes.meals}>
      <Card>{content}</Card>
    </section>
  );
};

export default AvailableMeals;
