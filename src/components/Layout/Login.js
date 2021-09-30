import { useState, useContext } from "react";
import AuthContext from "../../store/auth-context";
import LoginForm from "./LoginForm";
import Button from "@mui/material/Button";
import { Switch, Route, Link } from "react-router-dom";

const Login = () => {
  const authCtx = useContext(AuthContext);

  console.log(authCtx);

  const userLogout = () => {
    authCtx.logout();
  };

  return (
    <>
      {!authCtx.token ? (
        <Button color="inherit">
          <Link to="/Login">Login</Link>
        </Button>
      ) : (
        <Button color="inherit" onClick={userLogout}>
          Logout
        </Button>
      )}
      {/* {loginForm && <LoginForm />} */}
      <Switch>
        <Route path="/login" exact>
          <LoginForm />
        </Route>
      </Switch>
    </>
  );
};

export default Login;
