import { useState } from "react";
import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";
import Input from "../UI/InputComponent";
import GenreInput from "../UI/MultipleAutoCompleteInput";

function ArtistFilters({
  nameFilter,
  setNameFilter,
  genreFilter,
  setGenreFilter,
}) {
  const [displayGenre, setDisplayGenre] = useState("");

  return (
    <Box
      w={{ base: "80vw", md: "40vw" }}
      border="1px solid"
      borderColor="gray.300"
      boxShadow="lg"
      borderRadius="md"
      mt={4}
      p={4}
      mx={{ base: "auto", md: "0" }}
      ml={{ md: "auto" }}
    >
      <Input
        id="name"
        label=""
        type="text"
        placeholder="The Rolling Stones"
        value={nameFilter}
        setValue={setNameFilter}
      />
      <GenreInput
        id="tag"
        label=""
        placeholder="genre"
        selectedItemIds={genreFilter}
        setSelectedItemIds={setGenreFilter}
        url="api/genreTag"
        queryForTags=""
        queryForInput=""
        displayedValue={displayGenre}
        setDisplayedValue={setDisplayGenre}
      />
    </Box>
  );
}

ArtistFilters.propTypes = {
  nameFilter: PropTypes.string.isRequired,
  genreFilter: PropTypes.string.isRequired,
  setNameFilter: PropTypes.func.isRequired,
  setGenreFilter: PropTypes.func.isRequired,
};

export default ArtistFilters;
