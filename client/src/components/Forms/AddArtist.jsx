import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Button, Heading, Flex } from "@chakra-ui/react";
import InputComponent from "../UI/InputComponent";
import SelectComponent from "../UI/SelectComponent";

import connexion from "../../services/connexion";

function AddArtist({ onArtistAdded }) {
  const [name, setName] = useState("");
  const [countryId, setCountryId] = useState("");
  const [genre, setGenre] = useState("");

  const handleSubmit = async () => {
    try {
      const newArtist = {
        name,
        country_id: countryId,
        genre,
      };
      const response = await connexion.post("/api/artist", newArtist);
      onArtistAdded(response.data);
      setName("");
      setCountryId("");
      setGenre("");
    } catch (err) {
      throw new Error(err);
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" bg="white" shadow="md">
      <Heading as="h3" size="md" mb={4}>
        Ajouter un nouvel artiste
      </Heading>
      <Flex flexDirection={{ base: "column", md: "row" }} gap={6} align="end">
        <InputComponent
          id="name"
          label="Nom de l'artiste"
          type="text"
          placeholder="Nom de l'artiste"
          value={name}
          setValue={setName}
          isRequired
        />

        <SelectComponent
          id="country"
          url="/api/country"
          label="Pays"
          value={countryId}
          setValue={setCountryId}
          placeholder="Sélectionner un pays"
          isRequired
        />

        <InputComponent
          id="genre"
          label="Genre"
          type="text"
          placeholder="Genre"
          value={genre}
          setValue={setGenre}
          isRequired
        />

        <Button
          width={{ base: "50%", md: "25%" }}
          colorScheme="blue"
          onClick={handleSubmit}
        >
          Ajouter l'artiste
        </Button>
      </Flex>
    </Box>
  );
}

AddArtist.propTypes = {
  onArtistAdded: PropTypes.func.isRequired,
};

export default AddArtist;
