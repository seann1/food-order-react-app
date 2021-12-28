import { useContext } from "react";

import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import AuthContext from "../../../store/auth-context";
// import classes from "./MealItem.module.css";

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
    <Paper elevation={3}>
      <Box m={2} p={2}>
        <Grid container>
          <Grid item xs={9}>
            <Typography variant="h4">{props.name}</Typography>
            <Typography variant="body1">{props.description}</Typography>
          </Grid>
          <Grid item xs={3} justify="flex-end">
            <Typography variant="h4" align="right">
              {price}
            </Typography>
          </Grid>
        </Grid>
        {authCtx.token && (
          <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
        )}
      </Box>
    </Paper>
  );
};
export default MealItem;
