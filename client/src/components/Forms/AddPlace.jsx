import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from "@geoapify/react-geocoder-autocomplete";

import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import { useState } from "react";

function AddPlace() {
  const [inputValue, setInputValue] = useState("");
  const [newPlace, setNewPlace] = useState({});
  console.info(newPlace);
  const handleSelect = ({ properties }) => {
    setInputValue(properties.formatted);
    setNewPlace({
      name: "To Complete",
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
