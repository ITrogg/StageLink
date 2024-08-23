import { useLoaderData } from "react-router-dom";
import { Box, Spinner, Text } from "@chakra-ui/react";
import ArtistTable from "../../components/Detail/ArtistTable";
// import SearchBlock from "../../components/Forms/Search/SearchBlock";
// import ArtistFilters from "../../components/Forms/Search/ArtistFilters";

function ArtistList() {
  // Récupération des données via le loader
  const artists = useLoaderData();

  if (!artists) {
    return (
      <Box textAlign="center" p={4}>
        <Spinner size="xl" />
        <Text mt={4}>Chargement des artistes...</Text>
      </Box>
    );
  }

  return (
    <Box>
      {/* <SearchBlock filters={filters} onFilterRemove={handleFilterRemove}>
        <ArtistFilters
          searchQuery={filters.searchQuery}
          genre={filters.genre}
          onSearchChange={handleSearchChange}
          onGenreChange={handleGenreChange}
        />
      </SearchBlock> */}
      <ArtistTable artists={artists} />
    </Box>
  );
}

export default ArtistList;
