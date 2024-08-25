import { useLoaderData } from "react-router-dom";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import DetailHeader from "../../components/Detail/DetailHeader";
import TabComponent from "../../components/Detail/Tab/TabComponent";
import ArtistInfosTab from "../../components/Detail/Tab/ArtistInfosTab";
import EditArtist from "../../components/Forms/EditArtist";

function ArtistDetail() {
  const [artist, genreTags, pastEvents, futureEvents] = useLoaderData();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <DetailHeader title={artist.name} imageUrl={artist.logo} />
      <Button colorScheme="teal" onClick={onOpen}>
        Ajouters de informations
      </Button>
      <TabComponent
        infos={<ArtistInfosTab artist={artist} genreTags={genreTags} />}
        pastEvents={pastEvents}
        futureEvents={futureEvents}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <EditArtist artist={artist} genreTags={genreTags} onClose={onClose} />
      </Modal>
    </Box>
  );
}

export default ArtistDetail;
