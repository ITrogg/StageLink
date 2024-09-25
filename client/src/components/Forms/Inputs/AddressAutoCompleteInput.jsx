import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";

import "@geoapify/geocoder-autocomplete/styles/minimal.css";

function AddressAutoCompleteInput(handleSelect) {
  return (
    <GeoapifyContext apiKey={import.meta.env.VITE_GEOAPIFY_KEY}>
      <GeoapifyGeocoderAutocomplete
        placeholder="Enter address here"
        type="amenity"
        lang="fr"
        limit={5}
        placeSelect={handleSelect}
      />
    </GeoapifyContext>
  );
}

export default AddressAutoCompleteInput;
