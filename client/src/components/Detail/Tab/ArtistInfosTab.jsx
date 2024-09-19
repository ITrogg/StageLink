import PropTypes from "prop-types";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";

function ArtistInfosTab({ artist, tags }) {
  // Format genreTags from array of objects to array of strings
  const tagsNames = tags.map((tag) => tag.label);

  return (
    <Box p={6} borderWidth="1px" borderRadius="md" bg="white" shadow="md">
      <Heading as="h2" size="lg" mb={4}>
        Infos sur l'artiste
      </Heading>
      <VStack spacing={4} align="center">
        <Text fontSize="lg">
          <strong>Genre:</strong> {artist.shortDesc}
        </Text>
        <Text fontSize="lg">
          <strong>Tags:</strong> {tagsNames.join(", ")}
        </Text>
      </VStack>
    </Box>
  );
}

ArtistInfosTab.propTypes = {
  artist: PropTypes.shape({
    shortDesc: PropTypes.string.isRequired,
  }).isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ArtistInfosTab;
