import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./store/auth-context";
import RestaurantContextProvider from "./store/RestaurantProvider";
import { Wrapper } from "@googlemaps/react-wrapper";

import "./index.css";
import App from "./App";

ReactDOM.render(
  <RestaurantContextProvider>
    <AuthContextProvider>
      <BrowserRouter>
        <Wrapper apiKey={process.env.REACT_APP_API_KEY} libraries={["places"]}>
          <App />
        </Wrapper>
      </BrowserRouter>
    </AuthContextProvider>
  </RestaurantContextProvider>,
  document.getElementById("root")
);
