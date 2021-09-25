import { useState, useContext } from "react";
import AuthContext from "../../store/auth-context";
import LoginForm from "./LoginForm";
import Button from "@mui/material/Button";

const Login = () => {
  //const [isLogin, setIsLogin] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const authCtx = useContext(AuthContext);

  const showLoginForm = () => {
    setLoginForm(true);
  };

  return (
    <>
      {!authCtx.token ? (
        <Button color="inherit" onClick={showLoginForm}>
          Login
        </Button>
      ) : (
        <Button color="inherit">Logout</Button>
      )}
      {loginForm && <LoginForm />}
    </>
  );
};

export default Login;
