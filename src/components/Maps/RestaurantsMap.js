import {
  GoogleMap,
  Marker,
  withGoogleMap,
  InfoWindow,
} from "react-google-maps";
import { useHistory } from "react-router-dom";
import Typography from "@mui/material/Typography";

const RestaurantMap = withGoogleMap((props) => {
  const history = useHistory();

  const handleClick = (id) => {
    history.push(`/${id}`);
  };

  const markerBounds = new window.google.maps.LatLngBounds();
  props.restaurantMarkers.map((marker) => {
    return markerBounds.extend(marker.location.coordinates);
  });

  return (
    <GoogleMap ref={(map) => map && map.fitBounds(markerBounds)}>
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
});

export default RestaurantMap;
