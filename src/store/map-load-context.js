// import React, { useReducer } from "react";

// export const MapLoadContext = React.createContext({
//   setIsLoaded: () => {},
//   isLoaded: false,
// });

// const defaultMapLoadState = {
//   isLoaded: false,
// };

// const mapLoadReducer = (state, action) => {
//   if (action.type === "SET_LOADED") {
//     return {
//       isLoaded: action.isLoaded,
//     };
//   }
// };

// export const MapLoadContextProvider = (props) => {
//   const [mapLoadState, dispatchMapLoadAction] = useReducer(
//     mapLoadReducer,
//     defaultMapLoadState
//   );
//   const setLoadedHandler = (loaded) => {
//     dispatchMapLoadAction({ type: "SET_LOADED", isLoaded: loaded });
//   };
//   const contextValues = {
//     setIsLoaded: setLoadedHandler,
//     isLoaded: mapLoadState.isLoaded,
//   };
//   return (
//     <MapLoadContext.Provider value={contextValues}>
//       {props.children}
//     </MapLoadContext.Provider>
//   );
// };
