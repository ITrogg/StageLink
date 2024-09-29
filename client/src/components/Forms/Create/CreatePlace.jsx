import { useState } from "react";
import PropTypes from "prop-types";

import { SimpleGrid, Button } from "@chakra-ui/react";

import InputComponent from "../../UI/Inputs/TextInput";
import AddressAutoCompleteInput from "../../UI/Inputs/AddressAutoCompleteInput";

import connexion from "../../../services/connexion";

function AddPlace({ onPlaceCreated }) {
  const [locationInfo, setLocationInfo] = useState({});
  const [newPlaceName, setNewPlaceName] = useState("");

  const handleSubmit = async () => {
    const newPlace = { ...locationInfo, name: newPlaceName };
    try {
      const response = await connexion.post("api/place", newPlace);
      onPlaceCreated(response.data, newPlaceName);
      setNewPlaceName("");
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <SimpleGrid columns={1} spacing={5} p={4}>
      <InputComponent
        id="placeName"
        label="Nom du lieu à ajouter"
        placeholder="La Place 2B"
        isRequired
        value={newPlaceName}
        handleChange={(e) => setNewPlaceName(e.target.value)}
      />
      <AddressAutoCompleteInput setLocationInfo={setLocationInfo} />
      <Button onClick={handleSubmit}>Ajouter le lieu</Button>
    </SimpleGrid>
  );
}

AddPlace.propTypes = {
  onPlaceCreated: PropTypes.func.isRequired,
};

export default AddPlace;
