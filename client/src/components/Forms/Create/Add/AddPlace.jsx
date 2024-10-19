import { useState } from "react";
import PropTypes from "prop-types";

import {
  Box,
  FormControl,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
} from "@chakra-ui/react";

import AutoCompleteInput from "../../../UI/Inputs/AutoCompleteInput";
import CreatePlace from "../CreatePlace";

function AddPlace({ handleChange }) {
  const [displayedPlace, setDisplayedValue] = useState("");
  const onPlaceCreated = (id, name) => {
    handleChange("placeId", id);
    setDisplayedValue(name);
  };

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.50">
      <Text fontWeight="bold" mb={2}>
        Où ?
      </Text>
      <FormControl mb={4}>
        <AutoCompleteInput
          id="location"
          label="Lieu"
          placeholder="Le Zénith"
          isRequired
          handleChange={handleChange}
          url="api/place"
          query="?type=forInput"
          displayedValue={displayedPlace}
          setDisplayedValue={setDisplayedValue}
        />
      </FormControl>
      <Accordion allowToggle mt={4}>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Ajouter un lieu
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <CreatePlace onPlaceCreated={onPlaceCreated} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
}

AddPlace.propTypes = {
  newEvent: PropTypes.shape({
    title: PropTypes.string,
    endDate: PropTypes.string,
    startDate: PropTypes.string.isRequired,
    startTime: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default AddPlace;
