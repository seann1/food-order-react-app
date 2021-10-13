import { useState } from "react";
import { GoogleMap, Marker, withGoogleMap } from "react-google-maps";

const MapComponent = withGoogleMap((props) => {
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const handleMouseOver = () => {
    setShowInfoWindow(true);
  };
  const handleMouseOut = () => {
    setShowInfoWindow(false);
  };
  return (
    <GoogleMap
      containerElement={<div style={{ height: `500px`, width: "500px" }} />}
      mapElement={<div style={{ height: `100%` }} />}
      //bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
      defaultCenter={{
        lat: props.chosenRestaurant[0].location.coordinates.lat,
        lng: props.chosenRestaurant[0].location.coordinates.lon,
      }}
      defaultZoom={16}
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
          lng: props.chosenRestaurant[0].location.coordinates.lon,
        }}
        // lat={chosenRestaurant[0].location.coordinates.lat}
        // lng={chosenRestaurant[0].location.coordinates.lon}
      />
      {/* {showInfoWindow && (
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
      )} */}
    </GoogleMap>
  );
});

export default MapComponent;
