import React, { createContext, useContext } from "react";
import { useJsApiLoader } from "@react-google-maps/api";
//import { UseLoadScriptOptions } from "@react-google-maps/api/dist/useJsApiLoader";

const GoogleMapsContext = createContext({ isLoaded: false });
const libraries = ["places"];
export const GoogleMapsProvider = ({ children }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
    libraries: libraries,
  });

  return (
    <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

export const useGoogleMaps = () => useContext(GoogleMapsContext);
