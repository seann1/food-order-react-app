import { GoogleMap, Marker, withGoogleMap } from "react-google-maps";

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
