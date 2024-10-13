import PropTypes from "prop-types";
import { Box, Text } from "@chakra-ui/react";

import TextInput from "../../../UI/Inputs/TextInput";
import TextareaInput from "../../../UI/Inputs/TextareaInput";
import NumberInput from "../../../UI/Inputs/NumberInput";
import SwitchInput from "../../../UI/Inputs/SwitchInput";

function AddMoreDetails({ newEvent, handleChange }) {
  const { description, facebookLink, ticketLink } = newEvent;

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.50">
      <Text fontWeight="bold" mb={2}>
        Détails supplémentaires
      </Text>
      <TextareaInput
        label="description"
        id="description"
        placeholder="Description de l'événement"
        value={description}
        handleChange={(e) => handleChange("description", e.target.value)}
      />
      <SwitchInput id="isFree" label="Evenement Gratuit ? " />
      <NumberInput id="priceAtDoor" label="Prix à l'entrée" />
      <NumberInput id="pricePrevent" label="Prix en prevente" />
      <TextInput
        id="facebookLink"
        label="Lien Facebook"
        placeholder="Lien vers la page Facebook"
        value={facebookLink}
        handleChange={(e) => handleChange("facebookLink", e.target.value)}
      />
      <TextInput
        id="ticketLink"
        label="Lien des billets"
        placeholder="Lien vers la page de vente des billets"
        value={ticketLink}
        handleChange={(e) => handleChange("ticketLink", e.target.value)}
      />
    </Box>
  );
}

AddMoreDetails.propTypes = {
  newEvent: PropTypes.shape({
    description: PropTypes.string,
    facebookLink: PropTypes.string,
    ticketLink: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default AddMoreDetails;
