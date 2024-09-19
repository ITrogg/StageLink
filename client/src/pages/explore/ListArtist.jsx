import { useLoaderData } from "react-router-dom";
import { Box, Heading, Spinner, Text } from "@chakra-ui/react";
import ArtistTable from "../../components/Detail/ArtistTable";

function ArtistList() {
  // Récupération des données via le loader
  const artists = useLoaderData();

  return (
    <Box margin="auto" w={{ base: "100vw", md: "75vw" }}>
      <Heading as="h1" size="2xl" textAlign="center">
        Rechercher un artiste
      </Heading>
      <Heading as="h2" size="lg" mt={8} mb={4} textAlign="center">
        Liste des artistes
      </Heading>
      {artists ? (
        <ArtistTable artists={artists} />
      ) : (
        <Box textAlign="center" p={4}>
          <Spinner size="xl" />
          <Text mt={4}>Chargement des artistes...</Text>
        </Box>
      )}
    </Box>
  );
}

export default ArtistList;
