import { useState } from "react";
import TextField from "@mui/material/TextField";
import { getIn } from "formik";
import AwesomeDebouncePromise from "awesome-debounce-promise";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export default function FormikPlacesFunction(props) {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [name, setName] = useState(props.field.name);
  //const [address, setAddress] = useState(props.value || "");
  const handleChange = (value) => {
    console.log(props.form);
    props.form.setFieldTouched(`${name}.value`);
    props.form.setFieldTouched(`${name}.address`);
    props.form.setFieldValue(name, { value: address });
    setAddress(value);
    console.log(value);
  };
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setAddress(value);
    setCoordinates(latLng);
  };

  const handleError = (error) => {
    //console.log("Google Maps API returned error with status: ", status);
    props.form.setFieldError(name, error);
    //clearSuggestions();
  };

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
        onError={handleError}
        debounce={300}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <p>Latitude: {coordinates.lat}</p>
            <p>Longitude: {coordinates.lng}</p>
            <TextField
              fullWidth
              {...getInputProps({ placeholder: "Type address" })}
              //isValid={getIn(touched, name) && !getIn(errors, name)}
              //isInvalid={getIn(touched, name) && !!getIn(errors, name)}
            />

            <div>
              {loading ? <div>...loading</div> : null}
              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#dadada" : "#fff",
                };
                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
            {props.form.errors.location && (
              <>
                <div>{props.form.errors.location.value}</div>
                <div>{props.form.errors.location.address}</div>
              </>
            )}
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}
