import { useState, useContext } from "react";
import AuthContext from "../../store/auth-context";
import LoginForm from "./LoginForm";
import Button from "@mui/material/Button";
import { getAuth } from "firebase/auth";
//import IconButton from "@mui/material/IconButton";
//import AccountCircle from "@mui/icons-material/AccountCircle";
import { Switch, Route, Link } from "react-router-dom";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const auth = getAuth();

  const [loggedIn, setLoggedIn] = useState();

  // if (auth.currentUser !== null && loggedIn !== true) {
  //   setLoggedIn(true);
  // }
  //const [anchorEl, setAnchorEl] = useState(null);
  //!authCtx.token
  const logInFunction = () => {
    setLoggedIn(true);
  };

  const userLogout = () => {
    authCtx.logout();
    auth.signOut();
    setLoggedIn(false);
  };

  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  //!loggedIn
  return (
    <>
      {/* <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls="primary-search-account-menu"
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton> */}
      {!loggedIn ? (
        <Button color="inherit">
          <Link to="/Login">Login</Link>
        </Button>
      ) : (
        <Button color="inherit" onClick={userLogout}>
          Logout
        </Button>
      )}

      <Switch>
        <Route path="/login" exact>
          <LoginForm logUserIn={logInFunction} />
        </Route>
      </Switch>
    </>
  );
};

export default Login;
