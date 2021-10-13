import { useState } from "react";
import TextField from "@mui/material/TextField";

import { makeStyles } from "@material-ui/core";

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
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [name, setName] = useState(props.field.name);
  //const [address, setAddress] = useState(props.value || "");
  const handleChange = (value) => {
    //console.log(props.form);
    props.form.setFieldTouched(`${name}.value`);
    props.form.setFieldTouched(`${name}.address`);
    props.form.setFieldValue(name, { value: address });
    setAddress(value);
    //console.log(value);
  };
  const handleSelect = async (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        // this.setState(() => {
        // });
        props.form.setFieldValue(props.field.name, {
          value: address,
          address,
          coordinates: latLng,
        });
        return { address };
      })
      .catch((error) => props.form.setFieldError(this.state.name, error));
    // geocodeByAddress(value)
    //   .then((results) => getLatLng(results[0]))
    //   .then((latLng) => {
    //     this.setState(() => {
    //       props.form.setFieldValue(this.state.name, {
    //         value: address,
    //         address,
    //         coordinates: latLng,
    //       });

    //   });
    // })
    // .catch((error) => this.props.form.setFieldError(this.state.name, error));

    // setAddress(address);
    // setCoordinates(latLng);
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
            {/* <p>Latitude: {coordinates.lat}</p>
            <p>Longitude: {coordinates.lng}</p> */}
            <TextField
              label="Address"
              fullWidth
              name="location"
              className={classes.textField}
              // error={
              //   props.form.errors?.location?.value ||
              //   props.form.errors?.location?.address
              // }
              // helperText={
              //   props.form.errors?.location?.value ||
              //   props.form.errors?.location?.address
              //     ? "Please Enter a Valid Address"
              //     : " "
              // }
              {...getInputProps({ placeholder: "Type address" })}
              //isValid={getIn(touched, name) && !getIn(errors, name)}
              //isInvalid={getIn(touched, name) && !!getIn(errors, name)}
            />

            <div>
              {loading ? <div>...loading</div> : null}
              {suggestions.map((suggestion, index) => {
                const style = {
                  backgroundColor: suggestion.active ? "#dadada" : "#fff",
                };
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
            {/* {props.form.errors.location && (
              <>
                <div>{props.form.errors.location.value}</div>
                <div>{props.form.errors.location.address}</div>
              </>
            )} */}
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}
