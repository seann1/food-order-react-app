import { useState } from "react";
import TextField from "@mui/material/TextField";

import { makeStyles } from "@mui/styles";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const useStyles = makeStyles({
  textField: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    color: "white",
    paddingBottom: 0,
    marginTop: 30,
    fontWeight: 500,
  },
});

// const styles = (theme) => ({
//   textField: {
//     width: "90%",
//     marginLeft: "auto",
//     marginRight: "auto",
//     color: "white",
//     paddingBottom: 0,
//     marginTop: 0,
//     fontWeight: 500,
//   },
// });

export default function FormikPlacesFunction(props) {
  const classes = useStyles();
  const [address, setAddress] = useState("");
  //const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  //const [name, setName] = useState(props.field.name);
  //const [address, setAddress] = useState(props.value || "");
  const handleChange = (value) => {
    console.log(value);
    setAddress(value);
    props.form.setFieldTouched(`${props.field.name}.value`);
    props.form.setFieldTouched(`${props.field.name}.address`);
    props.form.setFieldValue(props.field.name, { value: address });
  };
  const handleSelect = async (address) => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);

    setAddress(address);
    props.form.setFieldValue(props.field.name, {
      value: address,
      address: address,
      coordinates: latLng,
    });

    //return { address };
    // .catch((error) => {
    //   console.log(error);
    //   //props.form.setFieldError(this.state.name, error);
    // });
  };

  const handleError = (error) => {
    props.form.setFieldError(props.field.name, error);
    //clearSuggestions();
  };

  return (
    <div>
      <PlacesAutocomplete
        field={props.field.name}
        name={props.field.name}
        id={props.field.name}
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
        onError={handleError}
        debounce={300}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            {console.log(arguments)}
            {/* <p>Latitude: {coordinates.lat}</p>
            <p>Longitude: {coordinates.lng}</p> */}
            <TextField
              label="Address"
              fullWidth
              // name="location"
              className={classes.textField}
              {...getInputProps({ placeholder: "Type address" })}
            />

            <div>
              {loading ? <div>...loading</div> : null}
              {suggestions.map((suggestion, index) => {
                console.log(suggestion);
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, { style })}
                    key={index}
                  >
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
