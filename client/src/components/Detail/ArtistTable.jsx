import PropTypes from "prop-types";
import { Table, Thead, Tbody, Tr, Th, Box } from "@chakra-ui/react";
import ArtistRow from "./ArtistRow";

function ArtistTable({ artists }) {
  return (
    <Box overflowX="auto" mb={8}>
      <Table variant="simple" size="sm">
        {" "}
        {/* Taille du texte réduite */}
        <Thead>
          <Tr>
            <Th
              fontSize={{ base: "sm", md: "lg" }}
              fontWeight="bold"
              width="50%"
            >
              Nom
            </Th>
            <Th
              fontSize={{ base: "sm", md: "lg" }}
              fontWeight="bold"
              width="30%"
            >
              Genre
            </Th>
            <Th
              fontSize={{ base: "sm", md: "lg" }}
              fontWeight="bold"
              width="20%"
            >
              Événements
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {artists.map((artist) => (
            <ArtistRow key={artist.id} artist={artist} />
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}

ArtistTable.propTypes = {
  artists: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      events: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ArtistTable;
