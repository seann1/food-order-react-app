//import Button from "@material-ui/core/Button";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { Link, useLocation } from "react-router-dom";
import Tooltip from "@material-ui/core/Tooltip";
import HeaderCartButton from "./HeaderCartButton";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Login from "./Login";
import Alert from "@mui/material/Alert";
import classes from "./Header.module.css";

const Header = (props) => {
  const currentLocation = useLocation().pathname;
  const authCtx = useContext(AuthContext);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky">
          <Toolbar>
            {currentLocation !== "/" ? (
              <>
                <Tooltip
                  title="Back to Restaurant selection"
                  placement="bottom-start"
                >
                  <Typography
                    variant="h2"
                    //component="div"
                    component={Link}
                    to="/"
                    sx={{ flexGrow: 1 }}
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
            {authCtx.token && (
              <>
                <Box m={2}>
                  <HeaderCartButton onClick={props.onShowCart} />
                </Box>
                <Box m={2}>
                  <Link to="/newrestaurant">
                    <Button variant="contained">Create Restaurant</Button>
                  </Link>
                </Box>
              </>
            )}

            <Login />
          </Toolbar>
        </AppBar>
      </Box>
      {!authCtx.isLoggedIn && (
        <Box m={2}>
          <Alert severity="info">
            Login with email: <strong>admin@admin.com</strong> Password:
            <strong>password</strong> to place an order
          </Alert>
        </Box>
      )}
    </>
  );
};

export default Header;
