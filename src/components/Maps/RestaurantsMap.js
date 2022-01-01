import React, { useRef, useEffect } from "react";
import {
  GoogleMap,
  LoadScript,
  useJsApiLoader,
  Marker,
  InfoBox,
  InfoWindow,
} from "@react-google-maps/api";
import { useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";

const RestaurantMap = (props) => {
  const mapRef = useRef(null);

  // Fit bounds function
  const fitBounds = () => {
    const bounds = new window.google.maps.LatLngBounds();
    props.restaurantMarkers.map((item) => {
      bounds.extend(item.location.coordinates);
      return item.id;
    });
    mapRef.current.fitBounds(bounds);
  };

  // Fit bounds on mount, and when the markers change
  useEffect(() => {
    fitBounds();
  }, [props.restaurantMarkers]);

  const containerStyle = {
    width: "100%",
    height: "50vh",
  };

  const center = {
    lat: 0,
    lng: -180,
  };
  const position = {
    lat: 37.772,
    lng: -122.214,
  };

  return (
    // <LoadScript googleMapsApiKey={process.env.REACT_APP_API_KEY}>
    <GoogleMap mapContainerStyle={containerStyle} ref={mapRef}>
      {props.restaurantMarkers.map((marker, index) => {
        return (
          <>
            <Marker
              key={index}
              position={{
                lat: marker.location.coordinates.lat,
                lng: marker.location.coordinates.lng,
              }}
              // onClick={() => handleClick(marker.id)}
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
                    Hello, World!
                  </div>
                </div>
              </InfoBox>
            </Marker>
          </>
        );
      })}
    </GoogleMap>
    // </LoadScript>
  );
};

export default RestaurantMap;
