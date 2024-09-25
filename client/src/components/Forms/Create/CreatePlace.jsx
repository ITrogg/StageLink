import { useState } from "react";
import { SimpleGrid, Button } from "@chakra-ui/react";

import InputComponent from "../../UI/Inputs/TextInput";
import AddressAutoCompleteInput from "../../UI/Inputs/AddressAutoCompleteInput";

function AddPlace() {
  const [locationInfo, setLocationInfo] = useState({});
  const [newPlaceName, setNewPlaceName] = useState("");

  const handleSubmit = () => {
    const newPlace = { ...locationInfo, name: newPlaceName };
    return newPlace;
  };

  return (
    <SimpleGrid columns={1} spacing={5} p={4}>
      <InputComponent
        id="placeName"
        label="Nom du lieu à ajouter"
        type="text"
        placeholder="La Place 2B"
        isRequired
        value={newPlaceName}
        setValue={setNewPlaceName}
      />
      <AddressAutoCompleteInput setLocationInfo={setLocationInfo} />
      <Button onClick={handleSubmit}>Ajouter le lieu</Button>
    </SimpleGrid>
  );
}
export default AddPlace;
