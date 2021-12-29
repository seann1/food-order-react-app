import { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { Link, useLocation } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import HeaderCartButton from "./HeaderCartButton";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Login from "./Login";
import Alert from "@mui/material/Alert";
import classes from "./Header.module.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

theme.typography.h3 = {
  fontSize: "1.2rem",
  color: "white",
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
};

const Header = (props) => {
  const currentLocation = useLocation().pathname;
  const authCtx = useContext(AuthContext);
  const smallScreen = useMediaQuery("(max-width:1000px)");
  const signedInAndSmall = authCtx.token && smallScreen;
  const signedInAndBig = authCtx.token && !smallScreen;

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
                  <ThemeProvider theme={theme}>
                    <Typography
                      variant="h3"
                      //component="div"
                      component={Link}
                      to="/"
                      sx={{ flexGrow: 1 }}
                      className={classes.pointer}
                      style={{ textDecoration: "none" }}
                    >
                      ReactMeals
                    </Typography>
                  </ThemeProvider>
                </Tooltip>
              </>
            ) : (
              <ThemeProvider theme={theme}>
                <Typography
                  variant="h3"
                  component={Link}
                  to="/"
                  sx={{ flexGrow: 1 }}
                  className={classes.pointer}
                  style={{ textDecoration: "none" }}
                >
                  ReactMeals
                </Typography>
              </ThemeProvider>
            )}
            {authCtx.token && <HeaderCartButton onClick={props.onShowCart} />}
            {signedInAndBig && (
              <>
                <Box m={2}>
                  <Link to="/newrestaurant" style={{ textDecoration: "none" }}>
                    <Button variant="contained">Create Restaurant</Button>
                  </Link>
                </Box>
              </>
            )}

            <Login />
          </Toolbar>
        </AppBar>

        {signedInAndSmall && (
          <Container maxWidth="lg">
            <Box m={2}>
              <Link to="/newrestaurant" style={{ textDecoration: "none" }}>
                <Button variant="contained">Create Restaurant</Button>
              </Link>
            </Box>
          </Container>
        )}
      </Box>
      {!authCtx.isLoggedIn && (
        <Container maxWidth="lg">
          <Box m={2}>
            <Alert severity="info">
              Login with email: <strong>admin@admin.com</strong> Password:
              <strong> password</strong> to place an order
            </Alert>
          </Box>
        </Container>
      )}
    </>
  );
};

export default Header;
