import PropTypes from "prop-types";
import { Box, FormControl, FormLabel, Textarea, Text } from "@chakra-ui/react";

import TextInput from "../../../UI/Inputs/TextInput";

function AddMoreDetails({ newEvent, setNewEvent }) {
  const { description, facebookLink, ticketLink } = newEvent;
  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [id]: value,
    }));
  };
  return (
    <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.50">
      <Text fontWeight="bold" mb={2}>
        Détails supplémentaires
      </Text>
      <FormControl mb={4}>
        <FormLabel htmlFor="description">Description</FormLabel>
        <Textarea
          id="description"
          placeholder="Description de l'événement"
          value={description}
          onChange={handleChange}
          rows={5}
          bg="none"
          borderColor="gray.300"
          _focus={{
            borderColor: "pink.500",
            boxShadow: "none",
            outline: "none",
          }}
          fontSize="md"
          lineHeight="1.5"
        />
        <TextInput
          id="facebookLink"
          label="Lien Facebook"
          type="text"
          placeholder="Lien vers la page Facebook"
          value={facebookLink}
          handleChange={handleChange}
        />
        <TextInput
          id="ticketLink"
          label="Lien des billets"
          type="text"
          placeholder="Lien vers la page de vente des billets"
          value={ticketLink}
          handleChange={handleChange}
        />
      </FormControl>
    </Box>
  );
}

AddMoreDetails.propTypes = {
  newEvent: PropTypes.shape({
    description: PropTypes.string,
    facebookLink: PropTypes.string,
    ticketLink: PropTypes.string,
  }).isRequired,
  setNewEvent: PropTypes.func.isRequired,
};

export default AddMoreDetails;
