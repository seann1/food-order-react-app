import { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import OrderForm from "./components/OrderForm/OrderForm";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [orderFormIsShown, setOrderFormIsShown] = useState(false);

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
  return (
    <CartProvider>
      {/* cart component is the modal */}
      {cartIsShown && (
        <Cart onClose={hideCartHandler} onOrder={showOrderFormHandler} />
      )}
      {orderFormIsShown && (
        <OrderForm onClose={hideOrderFormHandler} returnToMenu={closeModal} />
      )}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
