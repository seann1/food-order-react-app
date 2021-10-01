import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";
import RestaurantContextProvider from "./store/RestaurantProvider";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <RestaurantContextProvider>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </RestaurantContextProvider>,
  document.getElementById("root")
);
