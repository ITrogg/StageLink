import PropTypes from "prop-types";
import { Box, HStack } from "@chakra-ui/react";
import Input from "../../UI/Input";
import Select from "../../UI/Select";
import GenreInput from "../../UI/GenreInput";

function EventFilters({
  searchQuery,
  date,
  genre,
  country,
  onSearchChange,
  onDateChange,
  onGenreChange,
  onCountryChange,
}) {
  const countries = [
    // Exemple de données pour le select des pays
    { value: "fr", label: "France" },
    { value: "us", label: "USA" },
    // Ajouter d'autres pays ici
  ];

  return (
    <Box>
      <HStack spacing={4} mb={4}>
        <Input
          value={searchQuery}
          onChange={onSearchChange}
          placeholder="Rechercher un événement"
        />
        <Input type="date" value={date} onChange={onDateChange} />
        <GenreInput value={genre} onChange={onGenreChange} />
        <Select
          options={countries}
          value={country}
          onChange={onCountryChange}
          placeholder="Sélectionner un pays"
        />
      </HStack>
    </Box>
  );
}

EventFilters.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onGenreChange: PropTypes.func.isRequired,
  onCountryChange: PropTypes.func.isRequired,
};

export default EventFilters;
