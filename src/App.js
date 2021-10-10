import { useState, useEffect, useContext, useCallback, useRef } from "react";

import RestaurantContext from "./store/restaurant-context";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import NewRestaurant from "./components/Restaurant/NewRestaurant";
import OrderForm from "./components/OrderForm/OrderForm";
import Restaurant from "./components/Restaurant/Restaurant";
import CartProvider from "./store/CartProvider";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@mui/material/Box";
import { Route, Switch, useHistory, Link } from "react-router-dom";
import equal from "fast-deep-equal";
import { Wrapper } from "@googlemaps/react-wrapper";
//import CartContext from "./store/cart-context";

function App() {
  //const [cartIsShown, setCartIsShown] = useState(false);
  const [orderFormIsShown, setOrderFormIsShown] = useState(false);
  const [restaurantId, setRestaurantId] = useState("");
  //const [restaurants, setRestaurants] = useState([]);

  const [restaurantInfo, setRestaurantInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const restaurantCtx = useContext(RestaurantContext);
  const restaurantData = useRef(null);

  let history = useHistory();
  const fetchRandMHandler = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://food-order-app-d078d-default-rtdb.firebaseio.com/restaurants.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      if (!equal(restaurantData.current, data)) {
        let restaurantsArray = [];
        restaurantCtx.clearRestaurants();
        for (let restaurant in data) {
          data[restaurant].id = restaurant;

          restaurantsArray.push(data[restaurant]);
          restaurantCtx.addRestaurant(data[restaurant]);
        }

        //setRestaurants(restaurantsArray);
      }
      setIsLoading(false);
      restaurantData.current = data;
    } catch (error) {}
  }, [restaurantCtx]);
  useEffect(() => {
    fetchRandMHandler();
  }, [fetchRandMHandler]);

  const showOrderFormHandler = () => {
    setOrderFormIsShown(true);
    //setCartIsShown(false);
  };

  const hideCartHandler = () => {
    history.push("/");
    //setCartIsShown(false);
  };

  const showCartHandler = () => {
    //setCartIsShown(true);
  };

  const hideOrderFormHandler = (submit) => {
    setOrderFormIsShown(false);
    //setCartIsShown(true);
  };

  const closeModal = () => {
    setOrderFormIsShown(false);
    //setCartIsShown(false);
    setRestaurantId("");
  };

  const restaurantChoiceHandler = (id, name, description) => {
    setRestaurantId(id);
    setRestaurantInfo({ name: name, description: description });
  };

  return (
    <CartProvider>
      {/* cart component is the modal */}
      <Route path="/cart" exact>
        <Cart
          onClose={hideCartHandler}
          onOrder={showOrderFormHandler}
          restaurantId={restaurantId}
          restaurantName={restaurantInfo.name}
        />
      </Route>
      {orderFormIsShown && (
        <OrderForm
          onClose={hideOrderFormHandler}
          onCancel={hideOrderFormHandler}
          returnToMenu={closeModal}
        />
      )}
      <Header onShowCart={showCartHandler} restaurantId={restaurantId} />
      <main>
        <Route path={`/restaurant/${restaurantId}`} exact>
          <Box m={2}>
            <Container maxWidth="lg">
              <Meals
                restaurantId={restaurantId}
                restaurantName={restaurantInfo.name}
                description={restaurantInfo.description}
                key={restaurantId}
              />
            </Container>
          </Box>
        </Route>
        <>
          {isLoading ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </div>
          ) : (
            <Switch>
              <Route path="/" exact>
                <Box m={2}>
                  <Container maxWidth="lg">
                    <Grid container spacing={3} direction="row">
                      {restaurantCtx.restaurants
                        .sort((a, b) =>
                          a.dateCreated < b.dateCreated ? 1 : -1
                        )
                        .map((restaurant) => (
                          <Grid item xs={3} key={restaurant.id}>
                            <Link to={`/restaurant/${restaurant.id}`}>
                              <Restaurant
                                id={restaurant.id}
                                key={restaurant.id}
                                restaurantPick={restaurantChoiceHandler}
                                name={restaurant.name}
                                description={restaurant.description}
                                image={restaurant.image}
                                location={restaurant.location}
                              />
                            </Link>
                          </Grid>
                        ))}
                    </Grid>
                  </Container>
                </Box>
              </Route>
              <Route path="/newrestaurant">
                <Wrapper
                  apiKey={process.env.REACT_APP_API_KEY}
                  libraries={["places"]}
                >
                  <NewRestaurant />
                </Wrapper>
              </Route>
            </Switch>
          )}
        </>
      </main>
    </CartProvider>
  );
}

export default App;
