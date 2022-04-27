import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";
import RestaurantContextProvider from "./store/RestaurantProvider";
import { GoogleMapsProvider } from "./store/GoogleMapsProvider";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <RestaurantContextProvider>
    <AuthContextProvider>
      <GoogleMapsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleMapsProvider>
    </AuthContextProvider>
  </RestaurantContextProvider>,
  document.getElementById("root")
);
