import { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import OrderForm from "./components/OrderForm/OrderForm";
import Restaurant from "./components/Restaurant/Restaurant";
import CartProvider from "./store/CartProvider";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();
  const [cartIsShown, setCartIsShown] = useState(false);
  const [orderFormIsShown, setOrderFormIsShown] = useState(false);
  const [restaurantId, setRestaurantId] = useState("");

  const showOrderFormHandler = () => {
    setOrderFormIsShown(true);
    setCartIsShown(false);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideOrderFormHandler = () => {
    setOrderFormIsShown(false);
    setCartIsShown(true);
  };

  const closeModal = () => {
    setOrderFormIsShown(false);
    setCartIsShown(false);
  };

  const restaurantChoiceHandler = (id) => {
    setRestaurantId(id);
    console.log(restaurantId);
  };

  const clearRestaurantId = () => {
    setRestaurantId("");
  };

  return (
    <CartProvider>
      {/* cart component is the modal */}
      {cartIsShown && (
        <Cart onClose={hideCartHandler} onOrder={showOrderFormHandler} />
      )}
      {orderFormIsShown && (
        <OrderForm onClose={hideOrderFormHandler} returnToMenu={closeModal} />
      )}
      <Header
        onShowCart={showCartHandler}
        restaurantId={restaurantId}
        backToRestaurants={clearRestaurantId}
      />
      <main>
        {restaurantId ? (
          <Meals restaurantId={restaurantId} />
        ) : (
          <>
            <Container maxWidth="lg">
              <Grid
                container
                spacing={3}
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={3}>
                  <Restaurant id={1} restaurantPick={restaurantChoiceHandler} />
                </Grid>
                <Grid
                  item
                  xs={3}
                  justifyContent="center"
                  alignItems="center"
                  justify="center"
                >
                  <Restaurant id={2} restaurantPick={restaurantChoiceHandler} />
                </Grid>
                <Grid
                  item
                  xs={3}
                  justifyContent="center"
                  alignItems="center"
                  justify="center"
                >
                  <Restaurant id={3} restaurantPick={restaurantChoiceHandler} />
                </Grid>
                <Grid
                  item
                  xs={3}
                  justifyContent="center"
                  alignItems="center"
                  justify="center"
                >
                  <Restaurant id={4} restaurantPick={restaurantChoiceHandler} />
                </Grid>
              </Grid>
            </Container>
          </>
        )}
      </main>
    </CartProvider>
  );
}

export default App;
