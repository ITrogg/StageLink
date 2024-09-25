import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";

import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import { useState } from "react";

function AddPlace() {
  const [inputValue, setInputValue] = useState("");
  const handleSelect = ({ properties }) => {
    setInputValue(properties.formatted);
  };

  return (
    <GeoapifyContext apiKey={import.meta.env.VITE_GEOAPIFY_KEY}>
      <GeoapifyGeocoderAutocomplete
        placeholder="Enter address here"
        value={inputValue}
        type="amenity"
        lang="fr"
        limit={5}
        placeSelect={handleSelect}
      />
    </GeoapifyContext>
  );
}

export default AddPlace;
