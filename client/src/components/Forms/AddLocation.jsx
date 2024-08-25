import { useState, useRef } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import InputComponent from "../UI/InputComponent";

import connexion from "../../services/connexion";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function AddLocationForm({ onLocationAdded }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [error, setError] = useState("");

  const autocompleteRef = useRef(null);

  // Fonction appelée lorsqu'un lieu est sélectionné
  const onPlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();

    if (place && place.address_components) {
      const newAddress = place.formatted_address || "";
      const lat = place.geometry.location.lat();
      const lon = place.geometry.location.lng();

      const getAddressComponent = (type) =>
        place.address_components.find((component) =>
          component.types.includes(type)
        )?.long_name || "";

      setAddress(newAddress);
      setLatitude(lat);
      setLongitude(lon);
      setCity(getAddressComponent("locality"));
      setState(getAddressComponent("administrative_area_level_1"));
      setCountry(getAddressComponent("country"));
      setPostalCode(getAddressComponent("postal_code"));
    }
  };

  const handleSubmit = async () => {
    setError("");
    if (!latitude || !longitude) {
      setError("Adresse non valide.");
      return;
    }

    try {
      const newLocation = {
        name,
        address,
        city,
        state,
        country,
        postal_code: postalCode,
        latitude,
        longitude,
      };

      await connexion.post("/api/location", newLocation);
      onLocationAdded(); // Appel du callback pour notifier que l'ajout est terminé
    } catch (err) {
      setError("Erreur lors de l'ajout du lieu.");
      console.error("Error adding location:", err); // Ajout d'un log pour le débogage
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" bg="white" shadow="md">
      <Heading as="h3" size="md" mb={4}>
        Ajouter un lieu
      </Heading>
      <VStack spacing={4} align="start">
        {error && <Text color="red.500">{error}</Text>}
        <FormControl id="name" isRequired>
          <FormLabel>Nom du lieu</FormLabel>
          <InputComponent
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nom du lieu"
          />
        </FormControl>

        <FormControl id="address" isRequired>
          <FormLabel>Adresse</FormLabel>
          <LoadScript
            googleMapsApiKey={GOOGLE_MAPS_API_KEY}
            libraries={["places"]}
          >
            <Autocomplete
              onLoad={(autocomplete) => {
                autocompleteRef.current = autocomplete;
              }}
              onPlaceChanged={onPlaceSelect}
            >
              <InputComponent placeholder="Entrez l'adresse" />
            </Autocomplete>
          </LoadScript>
        </FormControl>

        <Button colorScheme="blue" onClick={handleSubmit}>
          Ajouter le lieu
        </Button>
      </VStack>
    </Box>
  );
}

AddLocationForm.propTypes = {
  onLocationAdded: PropTypes.func.isRequired,
};

export default AddLocationForm;
