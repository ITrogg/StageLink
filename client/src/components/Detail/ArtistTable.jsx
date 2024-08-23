import PropTypes from "prop-types";
import { Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";
import ArtistRow from "./ArtistRow";

function ArtistTable({ artists }) {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Nom</Th>
          <Th>Genre</Th>
          <Th>Evenements A venir</Th>
        </Tr>
      </Thead>
      <Tbody>
        {artists.map((artist) => (
          <ArtistRow key={artist.id} artist={artist} />
        ))}
      </Tbody>
    </Table>
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
