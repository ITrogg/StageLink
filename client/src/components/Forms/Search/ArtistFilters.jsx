import PropTypes from "prop-types";
import { Box, HStack } from "@chakra-ui/react";
import Input from "../../UI/Input";
import GenreInput from "../../UI/GenreInput";

function ArtistFilters({ searchQuery, genre, onSearchChange, onGenreChange }) {
  return (
    <Box>
      <HStack spacing={4} mb={4}>
        <Input
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Rechercher un artiste"
        />
        <GenreInput value={genre} onChange={onGenreChange} />
      </HStack>
    </Box>
  );
}

ArtistFilters.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onGenreChange: PropTypes.func.isRequired,
};

export default ArtistFilters;
