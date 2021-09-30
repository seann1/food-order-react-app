import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import LoginForm from "./LoginForm";
import Button from "@mui/material/Button";
//import IconButton from "@mui/material/IconButton";
//import AccountCircle from "@mui/icons-material/AccountCircle";
import { Switch, Route, Link } from "react-router-dom";

const Login = () => {
  const authCtx = useContext(AuthContext);
  //const [anchorEl, setAnchorEl] = useState(null);

  //console.log(authCtx);

  const userLogout = () => {
    authCtx.logout();
  };

  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

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
      {!authCtx.token ? (
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
          <LoginForm />
        </Route>
      </Switch>
    </>
  );
};

export default Login;
