import { useLoaderData } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import DetailHeader from "../../components/Detail/DetailHeader";
import TabComponent from "../../components/Detail/Tab/TabComponent";
import ArtistInfosTab from "../../components/Detail/Tab/ArtistInfosTab";
import EditArtist from "../../components/Forms/EditArtist";

function ArtistDetail() {
  const [artist, genreTags, pastEvents, futureEvents] = useLoaderData();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Box p={6} mb={6} display="flex" alignItems="center" gap={6}>
        <Button colorScheme="teal" onClick={onOpen}>
          Ajouter des informations
        </Button>
        <Tooltip label="Ajouter aux favoris" aria-label="Ajouter aux favoris">
          <IconButton
            icon={<StarIcon />}
            aria-label="Ajouter aux favoris"
            colorScheme="yellow"
          />
        </Tooltip>
      </Box>
      <DetailHeader title={artist.name} imageUrl={artist.logo} />
      <TabComponent
        infos={<ArtistInfosTab artist={artist} genreTags={genreTags} />}
        pastEvents={pastEvents}
        futureEvents={futureEvents}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        motionPreset="slideInRight"
        size={{ base: "full", md: "5xl" }}
      >
        <EditArtist artist={artist} genreTags={genreTags} onClose={onClose} />
      </Modal>
    </Box>
  );
}

export default ArtistDetail;
