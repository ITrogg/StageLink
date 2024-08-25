import { useLoaderData } from "react-router-dom";
import { Button, Modal, ModalOverlay, useDisclosure } from "@chakra-ui/react";

import DetailHeader from "../../components/Detail/DetailHeader";
import TabComponent from "../../components/Detail/Tab/TabComponent";
import LocationInfosTab from "../../components/Detail/Tab/LocationInfosTab";
import EditLocation from "../../components/Forms/EditLocation";

function LocationDetail() {
  const [location, futureEvents, pastEvents] = useLoaderData();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <DetailHeader title={location.name} imageUrl={location.imageUrl} />
      <Button colorScheme="teal" onClick={onOpen}>
        Modifier l'événement
      </Button>
      <TabComponent
        infos={<LocationInfosTab location={location} />}
        pastEvents={pastEvents}
        futureEvents={futureEvents}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <EditLocation location={location} onClose={onClose} />
      </Modal>
    </div>
  );
}

export default LocationDetail;
