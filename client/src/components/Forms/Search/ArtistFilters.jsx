import { useState } from "react";
import PropTypes from "prop-types";
import { Box, HStack } from "@chakra-ui/react";
import Input from "../../UI/InputComponent";
import GenreInput from "../../UI/MultipleAutoCompleteInput";

function ArtistFilters({
  nameFilter,
  setNameFilter,
  genreFilter,
  setGenreFilter,
}) {
  const [displayGenre, setDisplayGenre] = useState("");
  return (
    <Box>
      <HStack spacing={4} mb={4}>
        <Input
          id="name"
          label="Rechercher un artiste"
          type="text"
          placeholder="Motörhead"
          value={nameFilter}
          setValue={setNameFilter}
        />
        <GenreInput
          id="tag"
          label="Genre"
          placeholder="genre"
          selectedItemIds={genreFilter}
          setSelectedItemIds={setGenreFilter}
          url="api/genreTag"
          queryForTags=""
          queryForInput=""
          displayedValue={displayGenre}
          setDisplayedValue={setDisplayGenre}
        />
      </HStack>
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
