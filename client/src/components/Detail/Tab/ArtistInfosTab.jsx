import PropTypes from "prop-types";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import LinksCard from "../LinksCard";

function ArtistInfosTab({ artist, genreTags }) {
  // Format genreTags from array of objects to array of strings
  const tags = genreTags.map((tag) => tag.label);

  // Extract links that are not null
  const links = [
    { title: "Website", url: artist.website },
    { title: "Amazon Music", url: artist.amazon_music_link },
    { title: "Apple Music", url: artist.apple_music_link },
    { title: "Bandcamp", url: artist.bandcamp_link },
    { title: "Facebook", url: artist.facebook_link },
    { title: "Instagram", url: artist.instagram_link },
    { title: "Spotify", url: artist.spotify_link },
    { title: "Twitter", url: artist.twitter_link },
    { title: "YouTube", url: artist.youtube_link },
  ].filter((link) => link.url !== null);

  return (
    <Box p={6} borderWidth="1px" borderRadius="md" bg="white" shadow="md">
      <Heading as="h2" size="lg" mb={4}>
        Infos sur l'artiste
      </Heading>
      <VStack spacing={4} align="center">
        <Text fontSize="lg">
          <strong>Genre:</strong> {artist.genre}
        </Text>
        <Text fontSize="lg">
          <strong>Tags:</strong> {tags.join(", ")}
        </Text>
        <LinksCard links={links} />
      </VStack>
    </Box>
  );
}

ArtistInfosTab.propTypes = {
  artist: PropTypes.shape({
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    amazon_music_link: PropTypes.string,
    apple_music_link: PropTypes.string,
    bandcamp_link: PropTypes.string,
    facebook_link: PropTypes.string,
    instagram_link: PropTypes.string,
    spotify_link: PropTypes.string,
    twitter_link: PropTypes.string,
    youtube_link: PropTypes.string,
    website: PropTypes.string,
  }).isRequired,
  genreTags: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ArtistInfosTab;
