import Button from "@material-ui/core/Button";
import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        {props.restaurantId && (
          <div>
            <Button
              variant="secondary"
              onClick={props.backToRestaurants}
              className="text-left"
            >
              Back to restaurants
            </Button>
          </div>
        )}
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </>
  );
};

export default Header;
