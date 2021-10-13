import { Component } from "react";
import TextField from "@mui/material/TextField";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

class FormikPlacesAutoComplete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.field.name,
      address: props.value || "",
    };
  }

  handleError = (error) => {
    console.log("error", error);
    this.props.form.setFieldError(this.state.name, error);
  };

  handleChange = (address) => {
    this.setState(() => {
      this.props.form.setFieldTouched(`${this.state.name}.value`);
      this.props.form.setFieldTouched(`${this.state.name}.address`);
      this.props.form.setFieldValue(this.state.name, { value: address });
      return { address };
    });
  };

  //searchDebounced = AwesomeDebouncePromise(this.handleChange, 300);

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        this.setState(() => {
          this.props.form.setFieldValue(this.state.name, {
            value: address,
            address,
            coordinates: latLng,
          });
          return { address };
        });
      })
      .catch((error) => this.props.form.setFieldError(this.state.name, error));
  };

  render() {
    const {
      field: { name, ...field }, // { name, value, onChange, onBlur } ...field
      form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
      classes,
      options,
      label,
      ...props
    } = this.props;

    const error = errors[name];
    const touch = touched[name];
    console.log(this.state);
    return (
      <PlacesAutocomplete
        name={name}
        id={name}
        {...props}
        searchOptions={this.props.options || {}}
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        onError={this.handleError}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <>
            <TextField
              label="Address"
              margin="normal"
              name="location"
              fullWidth
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input form-control",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, index) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: "#fafafa", cursor: "pointer" }
                  : { backgroundColor: "#ffffff", cursor: "pointer" };
                return (
                  <div
                    key={index}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                      key: index,
                    })}
                  >
                    <span key={index}>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
            {/* div wrapping input ends here */}
          </>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default FormikPlacesAutoComplete;
