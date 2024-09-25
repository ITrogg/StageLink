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
import MultipleAutoCompleteInput from "../../../UI/Inputs/MultipleAutoCompleteInput";
import CreateArtist from "../CreateArtist";

function AddArtists({ artistIds, setArtistIds }) {
  const [displayedArtist, setDisplayedArtist] = useState("caca");
  const handleAddArtist = (id) => {
    setArtistIds((prev) => [...prev, id]);
  };

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.50">
      <Text fontWeight="bold" mb={2}>
        Qui ?
      </Text>
      <FormControl mb={4}>
        <MultipleAutoCompleteInput
          id="artists"
          label="Artistes"
          placeholder="Mozart"
          selectedItemIds={artistIds}
          setSelectedItemIds={setArtistIds}
          queryForTags="?type=forTag"
          url="api/artist"
          queryForInput="?type=forInput"
          displayedValue={displayedArtist}
          setDisplayedValue={setDisplayedArtist}
        />
        <Accordion allowToggle mt={4}>
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Ajouter des artistes
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <CreateArtist onArtistAdded={handleAddArtist} />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </FormControl>
    </Box>
  );
}

AddArtists.propTypes = {
  artistIds: PropTypes.arrayOf().isRequired,
  setArtistIds: PropTypes.func.isRequired,
};

export default AddArtists;
