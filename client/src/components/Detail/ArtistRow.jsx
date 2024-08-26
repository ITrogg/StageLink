import PropTypes from "prop-types";
import { Tr, Td, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function ArtistRow({ artist }) {
  return (
    <Tr
      _hover={{ backgroundColor: "gray.200" }}
      cursor="pointer"
      borderBottom="1px solid #A0AEC0" // Ligne de séparation plus foncée
    >
      <Td fontSize={{ base: "sm", md: "md" }}>
        {" "}
        {/* Taille du texte réduite */}
        <Box
          as={Link}
          to={`/artistes/${artist.id}`}
          width="100%"
          height="100%"
          display="block"
        >
          {artist.name}
        </Box>
      </Td>
      <Td fontSize={{ base: "sm", md: "md" }}>
        {" "}
        {/* Taille du texte réduite */}
        <Box
          as={Link}
          to={`/artistes/${artist.id}`}
          width="100%"
          height="100%"
          display="block"
        >
          {artist.genre}
        </Box>
      </Td>
      <Td fontSize={{ base: "sm", md: "md" }}>
        {" "}
        {/* Taille du texte réduite */}
        <Box
          as={Link}
          to={`/artistes/${artist.id}`}
          width="100%"
          height="100%"
          display="block"
        >
          {artist.events}
        </Box>
      </Td>
    </Tr>
  );
}

ArtistRow.propTypes = {
  artist: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    events: PropTypes.number.isRequired,
  }).isRequired,
};

export default ArtistRow;
