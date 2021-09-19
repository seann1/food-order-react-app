import { useState, useEffect, useCallback } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import storage from "./firebase/base";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import OrderForm from "./components/OrderForm/OrderForm";
import Restaurant from "./components/Restaurant/Restaurant";
import CartProvider from "./store/CartProvider";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [orderFormIsShown, setOrderFormIsShown] = useState(false);
  const [restaurantId, setRestaurantId] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState({});
  const [imageUrl, setImageUrl] = useState("");

  const fetchRandMHandler = useCallback(async () => {
    try {
      const response = await fetch(
        "https://food-order-app-d078d-default-rtdb.firebaseio.com/restaurants.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      // const photos = await fetch(
      //   "gs://food-order-app-d078d.appspot.com/restaurants/xico"
      // );
      // if (!photos.ok) {
      //   throw new Error("Something went wrong in photos");
      // }
      // const photoData = await photos.json();
      // console.log(photoData);

      let restaurantsArray = [];

      for (let restaurant in data) {
        data[restaurant].id = restaurant;
        restaurantsArray.push(data[restaurant]);
      }

      setRestaurants(restaurantsArray);
    } catch (error) {}
  }, []);
  useEffect(() => {
    fetchRandMHandler();
    //const storage = getStorage();
    const pathReference = ref(storage, "restaurants/xico/xico-sign.jpg");
    getDownloadURL(pathReference).then((url) => {
      setImageUrl(url);
    });
    console.log(pathReference);
  }, [fetchRandMHandler]);

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

  const restaurantChoiceHandler = (id, name, description) => {
    setRestaurantId(id);
    setRestaurantInfo({ name: name, description: description });
  };

  const clearRestaurantId = () => {
    setRestaurantId("");
  };

  return (
    <CartProvider>
      {/* cart component is the modal */}
      {cartIsShown && (
        <Cart
          onClose={hideCartHandler}
          onOrder={showOrderFormHandler}
          restaurantId={restaurantId}
          restaurantName={restaurantInfo.name}
        />
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
          <Meals
            restaurantId={restaurantId}
            restaurantName={restaurantInfo.name}
            description={restaurantInfo.description}
          />
        ) : (
          <>
            <Container maxWidth="lg">
              <Grid container spacing={3} direction="row">
                {restaurants.map((restaurant) => (
                  <Grid item xs={3}>
                    <Restaurant
                      id={restaurant.id}
                      restaurantPick={restaurantChoiceHandler}
                      name={restaurant.name}
                      description={restaurant.description}
                      image={imageUrl}
                    />
                  </Grid>
                ))}
              </Grid>
            </Container>
          </>
        )}
      </main>
    </CartProvider>
  );
}

export default App;
