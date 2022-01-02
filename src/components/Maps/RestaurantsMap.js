import React from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";
// import { CircularProgress } from "@mui/material";
// import Box from "@mui/material/Box";

const RestaurantMap = (props) => {
  const history = useHistory();
  const MVC = new window.google.maps.MVCObject();
  console.log(MVC);
  const handleClick = (id) => {
    history.push(`/${id}`);
  };
  const markerBounds = new window.google.maps.LatLngBounds();
  props.restaurantMarkers.map((marker) => {
    return markerBounds.extend(marker.location.coordinates);
  });

  const containerStyle = {
    width: "100%",
    height: "50vh",
    borderRadius: "4px",
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={(map) => {
        console.log(map);
        map.fitBounds(markerBounds);
      }}
    >
      {props.restaurantMarkers.map((marker, index) => {
        return (
          <>
            <Marker
              key={index}
              position={{
                lat: marker.location.coordinates.lat,
                lng: marker.location.coordinates.lng,
              }}
              onClick={() => handleClick(marker.id)}
            >
              <InfoWindow
                position={{
                  lat: marker.location.coordinates.lat,
                  lng: marker.location.coordinates.lng,
                }}
                // anchor={{
                //   lat: marker.location.coordinates.lat,
                //   lng: marker.location.coordinates.lng,
                // }}
              >
                <Typography variant="body">{marker.name}</Typography>
              </InfoWindow>
            </Marker>
          </>
        );
      })}
    </GoogleMap>
  );
};

export default RestaurantMap;
