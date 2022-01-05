import { useContext } from "react";

import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import AuthContext from "../../../store/auth-context";
import classes from "./MealItem.module.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

const theme = createTheme();

theme.typography.h4 = {
  fontSize: "1.4rem",
  color: grey[800],
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
};

theme.typography.h6 = {
  fontSize: "1.2rem",
  color: grey[800],
  "@media (min-width:600px)": {
    fontSize: "1.5rem",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "2rem",
  },
};

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
      restaurantId: props.restaurantId,
      restaurantName: props.restaurantName,
    });
  };
  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={3}>
        <Box m={2} p={2}>
          <Grid container>
            <Grid item xs={12} sm={9}>
              <Typography variant="h4" gutterBottom={true}>
                {props.name}
              </Typography>
              <Typography variant="body1" className={classes.description}>
                {props.description}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={3} justify="flex-end">
              <Typography
                variant="h6"
                gutterBottom={true}
                align="right"
                className={classes.price}
              >
                {price}
              </Typography>
              {authCtx.token && (
                <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
              )}
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </ThemeProvider>
  );
};
export default MealItem;
