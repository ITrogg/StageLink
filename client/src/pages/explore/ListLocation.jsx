import { Flex, Heading } from "@chakra-ui/react";
import MapContainer from "../../components/Detail/MapContainer";

function ListLocation() {
  return (
    <Flex
      m="auto"
      flexDirection="column"
      p={6}
      width={{ base: "95vw", md: "80vw" }}
      height="75vh"
    >
      <Heading as="h1" mb={6}>
        Liste des Emplacements
      </Heading>
      <MapContainer />
    </Flex>
  );
}

export default ListLocation;
