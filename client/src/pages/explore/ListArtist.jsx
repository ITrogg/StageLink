import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { Box, Spinner, Text } from "@chakra-ui/react";
import ArtistTable from "../../components/Detail/ArtistTable";
import ArtistFilters from "../../components/Forms/Search/ArtistFilters";

import connexion from "../../services/connexion";

function ArtistList() {
  // Récupération des données via le loader
  const artists = useLoaderData();
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);

  useEffect(() => {
    const filterArtists = async () => {
      let tempFilteredArtists = artists.filter((artist) =>
        artist.name.toLowerCase().includes(nameFilter.toLowerCase())
      );

      if (genreFilter.length > 0) {
        tempFilteredArtists = await Promise.all(
          tempFilteredArtists.map(async (artist) => {
            const response = await connexion.get(
              `/api/genreTag?type=byArtist&artistId=${artist.id}`
            );
            const artistTags = response.data.map((tag) => tag.id);

            const hasAllGenres = genreFilter.every((selectedTagId) =>
              artistTags.includes(selectedTagId)
            );

            return hasAllGenres ? artist : null;
          })
        );
        // Filtrer les résultats null (ceux qui ne correspondent pas au filtre)
        tempFilteredArtists = tempFilteredArtists.filter(Boolean);
      }

      setFilteredArtists(tempFilteredArtists);
    };

    filterArtists();
  }, [nameFilter, genreFilter, artists]);

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
      <ArtistFilters
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        genreFilter={genreFilter}
        setGenreFilter={setGenreFilter}
      />
      <ArtistTable artists={filteredArtists} />
    </Box>
  );
}

export default ArtistList;
