import React, { useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useGoogleMaps } from "../../store/GoogleMapsProvider";
import { useHistory } from "react-router-dom";
import { Typography } from "@mui/material";

const RestaurantMap = (props) => {
  const [map, setMap] = React.useState(null);
  const [mapCenter, setMapCenter] = useState(null);
  const { isLoaded } = useGoogleMaps();
  const history = useHistory();

  const handleClick = (id) => {
    history.push(`/${id}`);
  };

  const onLoad = React.useCallback(function callback(map) {
    const markerBounds = new window.google.maps.LatLngBounds();
    props.restaurantMarkers.map((marker) => {
      return markerBounds.extend(marker.location.coordinates);
    });
    setMapCenter(markerBounds.getCenter());
    map.fitBounds(markerBounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const containerStyle = {
    width: "100%",
    height: "50vh",
    borderRadius: "4px",
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      onLoad={onLoad}
      center={mapCenter}
      onUnmount={onUnmount}
    >
      {props.restaurantMarkers.map((marker, index) => {
        return (
          <Marker
            key={marker.id}
            position={{
              lat: marker.location.coordinates.lat,
              lng: marker.location.coordinates.lng,
            }}
            onClick={() => handleClick(marker.id)}
          >
            <InfoWindow options={{ maxWidth: 320 }}>
              <div>
                <Typography variant="body">{marker.name}</Typography>
              </div>
            </InfoWindow>
          </Marker>
        );
      })}
    </GoogleMap>
  ) : (
    <></>
  );
};

{
  /* <InfoBox
position={{
  lat: marker.location.coordinates.lat,
  lng: marker.location.coordinates.lng,
}}
>
<div
  style={{
    backgroundColor: "white",
    padding: "3px",
    borderRadius: "4px",
    opacity: "0.75",
    minWidth: "60px",
    minHeight: "40px",
  }}
>
  <Typography variant="body">{marker.name}</Typography>
</div>
</InfoBox> */
}

export default React.memo(RestaurantMap);
