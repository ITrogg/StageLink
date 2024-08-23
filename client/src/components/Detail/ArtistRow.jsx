import PropTypes from "prop-types";
import { Tr, Td, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function ArtistRow({ artist }) {
  return (
    <Tr _hover={{ backgroundColor: "gray.100" }} cursor="pointer">
      <Td>
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
      <Td>
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
      <Td>
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
