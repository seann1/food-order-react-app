import React from "react";
import { GoogleMap, Marker, InfoBox } from "@react-google-maps/api";
import { useHistory } from "react-router-dom";
import { Typography } from "@mui/material";

const RestaurantMap = (props) => {
  const history = useHistory();
  // const MVC = new window.google.maps.MVCObject();

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
              {/* <InfoWindow
                position={{
                  lat: marker.location.coordinates.lat,
                  lng: marker.location.coordinates.lng,
                }}
                anchor={{
                  lat: marker.location.coordinates.lat,
                  lng: marker.location.coordinates.lng,
                }}
              >
                <Typography variant="body">{marker.name}</Typography>
              </InfoWindow> */}
              <InfoBox
                position={{
                  lat: marker.location.coordinates.lat,
                  lng: marker.location.coordinates.lng,
                }}
              >
                <div
                  style={{
                    "background-color": "white",
                    padding: "3px",
                    "border-radius": "4px",
                    opacity: "0.75",
                    "min-width": "60px",
                    "min-height": "40px",
                  }}
                >
                  <Typography variant="body">{marker.name}</Typography>
                </div>
              </InfoBox>
            </Marker>
          </>
        );
      })}
    </GoogleMap>
  );
};

export default RestaurantMap;
