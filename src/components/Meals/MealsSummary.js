import classes from "./MealsSummary.module.css";

const MealsSummary = (props) => {
  return (
    <section className={classes.summary}>
      <h2>{props.restaurantName}</h2>
      <p>{props.description}</p>
    </section>
  );
};

export default MealsSummary;
