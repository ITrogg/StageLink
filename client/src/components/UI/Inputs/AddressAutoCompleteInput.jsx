import PropTypes from "prop-types";
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";

import "@geoapify/geocoder-autocomplete/styles/minimal.css";

function AddressAutoCompleteInput({ setLocationInfo }) {
  const handleSelect = ({ properties }) => {
    setLocationInfo({
      address: properties.address_line1,
      city: properties.city,
      state: properties.state,
      country: properties.country,
      postal_code: properties.postcode,
      latitude: properties.lat,
      longitude: properties.lon,
    });
  };
  return (
    <GeoapifyContext apiKey={import.meta.env.VITE_GEOAPIFY_KEY}>
      <GeoapifyGeocoderAutocomplete
        placeholder="Entrez une adresse"
        type="amenity"
        lang="fr"
        limit={5}
        placeSelect={handleSelect}
      />
    </GeoapifyContext>
  );
}

AddressAutoCompleteInput.propTypes = {
  setLocationInfo: PropTypes.func.isRequired,
};

export default AddressAutoCompleteInput;
