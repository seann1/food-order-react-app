import { GoogleMap, Marker, withGoogleMap } from "react-google-maps";

const RestaurantMap = withGoogleMap((props) => {
  return (
    <GoogleMap
      defaultCenter={{
        lat: 45.5049376,
        lng: -122.6252431,
      }}
      defaultZoom={16}
    >
      {props.restaurantMarkers.map((marker) => {
        return (
          <Marker
            position={{
              lat: marker.location.coordinates.lat,
              lng: marker.location.coordinates.lng,
            }}
          />
        );
      })}
    </GoogleMap>
  );
});

export default RestaurantMap;
