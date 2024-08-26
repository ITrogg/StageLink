import { useLoaderData } from "react-router-dom";
import {
  Box,
  Button,
  IconButton,
  Modal,
  ModalOverlay,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

import DetailHeader from "../../components/Detail/DetailHeader";
import TabComponent from "../../components/Detail/Tab/TabComponent";
import LocationInfosTab from "../../components/Detail/Tab/LocationInfosTab";
import EditLocation from "../../components/Forms/EditLocation";

function LocationDetail() {
  const [location, futureEvents, pastEvents] = useLoaderData();
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
      <DetailHeader title={location.name} imageUrl={location.imageUrl} />
      <TabComponent
        infos={<LocationInfosTab location={location} />}
        pastEvents={pastEvents}
        futureEvents={futureEvents}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        motionPreset="slideInRight"
      >
        <ModalOverlay />
        <EditLocation location={location} onClose={onClose} />
      </Modal>
    </Box>
  );
}

export default LocationDetail;
