import { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import OrderForm from "./components/OrderForm/OrderForm";
import Restaurant from "./components/Restaurant/Restaurant";
import CartProvider from "./store/CartProvider";

function App() {
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
            <Restaurant id={1} restaurantPick={restaurantChoiceHandler} />
            <Restaurant id={2} restaurantPick={restaurantChoiceHandler} />
            <Restaurant id={3} restaurantPick={restaurantChoiceHandler} />
            <Restaurant id={4} restaurantPick={restaurantChoiceHandler} />
          </>
        )}
      </main>
    </CartProvider>
  );
}

export default App;
