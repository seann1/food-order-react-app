import React from "react";
import { GoogleMap, Marker, InfoBox, InfoWindow } from "@react-google-maps/api";
import { useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";
// import { CircularProgress } from "@mui/material";
// import Box from "@mui/material/Box";

const RestaurantMap = (props) => {
  const history = useHistory();

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
              {/* <InfoWindow>
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
                    backgroundColor: "yellow",
                    opacity: 0.75,
                    padding: 12,
                  }}
                >
                  <div style={{ fontSize: 16, fontColor: `#08233B` }}>
                    <Typography variant="body">{marker.name}</Typography>
                  </div>
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
