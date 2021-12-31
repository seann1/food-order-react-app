import React from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";

// const options = {
//   zoomControlOptions: {
//     position: google.maps.ControlPosition.RIGHT_CENTER, // 'right-center' ,
//     // ...otherOptions
//   },
// };

const RestaurantMap = (props) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_API_KEY, // ,
    // ...otherOptions
  });
  const history = useHistory();

  const handleClick = (id) => {
    history.push(`/${id}`);
  };

  const containerStyle = {
    width: "100%",
    height: "50vh",
  };

  const center = {
    lat: -3.745,
    lng: -38.523,
  };

  const renderMap = () => {
    // wrapping to a function is useful in case you want to access `window.google`
    // to eg. setup options or create latLng object, it won't be available otherwise
    // feel free to render directly if you don't need that
    // const onLoad = React.useCallback(function onLoad(mapInstance) {
    //   // do something with map Instance
    // });
    return (
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
        {props.restaurantMarkers.map((marker, index) => {
          return (
            <Marker
              key={index}
              position={{
                lat: marker.location.coordinates.lat,
                lng: marker.location.coordinates.lng,
              }}
              onClick={() => handleClick(marker.id)}
            >
              <InfoWindow>
                <Typography variant="body">{marker.name}</Typography>
              </InfoWindow>
            </Marker>
          );
        })}
      </GoogleMap>
    );
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }
  // const markerBounds = new google.maps.Map.LatLngBounds();
  // props.restaurantMarkers.map((marker) => {
  //   return markerBounds.extend(marker.location.coordinates);
  // });
  return isLoaded ? renderMap() : <CircularProgress />;
  // return (
  //   <Box m={2}>
  //     <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
  // <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
  //   {props.restaurantMarkers.map((marker, index) => {
  //     return (
  //       <Marker
  //         key={index}
  //         position={{
  //           lat: marker.location.coordinates.lat,
  //           lng: marker.location.coordinates.lng,
  //         }}
  //         onClick={() => handleClick(marker.id)}
  //       >
  //         <InfoWindow>
  //           <Typography variant="body">{marker.name}</Typography>
  //         </InfoWindow>
  //       </Marker>
  //     );
  //   })}
  // </GoogleMap>
  //     </LoadScript>
  //   </Box>
  // );
};

export default RestaurantMap;
