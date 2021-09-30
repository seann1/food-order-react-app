//import Button from "@material-ui/core/Button";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import Tooltip from "@material-ui/core/Tooltip";
import HeaderCartButton from "./HeaderCartButton";
// import mealsImage from "../../assets/meals.jpg";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Login from "./Login";
import Alert from "@mui/material/Alert";

import classes from "./Header.module.css";

const Header = (props) => {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky">
          <Toolbar>
            {props.restaurantId ? (
              <>
                <Tooltip title="Back to Restaurant selection">
                  <Typography
                    variant="h2"
                    component="div"
                    sx={{ flexGrow: 1 }}
                    onClick={props.backToRestaurants}
                    className={classes.pointer}
                  >
                    ReactMeals
                  </Typography>
                </Tooltip>
              </>
            ) : (
              <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                ReactMeals
              </Typography>
            )}
            <HeaderCartButton onClick={props.onShowCart} />
            <Login />
          </Toolbar>
        </AppBar>
      </Box>
      {!authCtx.isLoggedIn && (
        <Box m={2}>
          <Alert severity="info">
            Login with email: admin@admin.com Password: password
          </Alert>
        </Box>
      )}
      {/* <div className={classes["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div> */}
    </>
  );
};

export default Header;
