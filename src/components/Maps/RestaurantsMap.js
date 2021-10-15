import {
  GoogleMap,
  Marker,
  withGoogleMap,
  InfoWindow,
} from "react-google-maps";
import Typography from "@mui/material/Typography";

const RestaurantMap = withGoogleMap((props) => {
  const markerBounds = new window.google.maps.LatLngBounds();
  props.restaurantMarkers.map((marker) => {
    return markerBounds.extend(marker.location.coordinates);
  });

  return (
    <GoogleMap
      ref={(map) => map && map.fitBounds(markerBounds)}
      //   defaultCenter={{
      //     lat: 45.5049376,
      //     lng: -122.6252431,
      //   }}
      //   defaultZoom={16}
    >
      {props.restaurantMarkers.map((marker, index) => {
        return (
          <Marker
            key={index}
            position={{
              lat: marker.location.coordinates.lat,
              lng: marker.location.coordinates.lng,
            }}
          >
            <InfoWindow>
              <Typography variant="body">{marker.name}</Typography>
            </InfoWindow>
          </Marker>
        );
      })}
    </GoogleMap>
  );
});

export default RestaurantMap;
