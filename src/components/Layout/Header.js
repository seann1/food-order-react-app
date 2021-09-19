//import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import HeaderCartButton from "./HeaderCartButton";
import mealsImage from "../../assets/meals.jpg";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        {props.restaurantId ? (
          <>
            <Tooltip title="Back to Restaurant selection">
              <h1 onClick={props.backToRestaurants} className={classes.pointer}>
                ReactMeals
              </h1>
            </Tooltip>
            {/* <Button
              variant="contained"
              onClick={props.backToRestaurants}
              className="text-left"
            >
              Back to restaurants
            </Button> */}
          </>
        ) : (
          <h1>ReactMeals</h1>
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
