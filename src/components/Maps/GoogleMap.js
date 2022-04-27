import React, { useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useGoogleMaps } from "../../store/GoogleMapsProvider";
const MapComponent = (props) => {
  const { isLoaded } = useGoogleMaps();
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const handleMouseOver = () => {
    setShowInfoWindow(true);
  };
  const handleMouseOut = () => {
    setShowInfoWindow(false);
  };

  const containerStyle = {
    width: "100%",
    height: "50vh",
    borderRadius: "4px",
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{
        lat: props.chosenRestaurant[0].location.coordinates.lat,
        lng: props.chosenRestaurant[0].location.coordinates.lng,
      }}
      zoom={16}
    >
      {/* <div
        lat={props.chosenRestaurant[0].location.coordinates.lat}
        lng={props.chosenRestaurant[0].location.coordinates.lon}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      ></div> */}
      <Marker
        position={{
          lat: props.chosenRestaurant[0].location.coordinates.lat,
          lng: props.chosenRestaurant[0].location.coordinates.lng,
        }}
        // lat={chosenRestaurant[0].location.coordinates.lat}
        // lng={chosenRestaurant[0].location.coordinates.lon}
      />
      {showInfoWindow && (
        <div
          className={classes.infoWindow}
          lat={props.chosenRestaurant[0].location.coordinates.lat}
          lng={props.chosenRestaurant[0].location.coordinates.lon}
        >
          <Typography align="center" variant="h4">
            {props.chosenRestaurant[0].name}
          </Typography>
          <Typography align="center" variant="body">
            {props.chosenRestaurant[0].location.address}
          </Typography>
        </div>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default React.memo(MapComponent);
