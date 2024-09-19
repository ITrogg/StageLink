import { useContext } from "react";
import {
  Button,
  Box,
  Heading,
  Text,
  VStack,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { BellIcon, CalendarIcon, CheckIcon } from "@chakra-ui/icons";
import { useLoaderData } from "react-router-dom";
import DetailHeader from "../../../components/Detail/DetailHeader";
import ArtistTable from "../../../components/Detail/ArtistTable";
import EditEventForm from "../../../components/Forms/EditEvent";

import { AuthContext } from "../../../services/AuthContext";

function EventDetail() {
  const [event, artists] = useLoaderData();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isEventPast = new Date(event.start_date) < new Date();
  const { handleEventStatus } = useContext(AuthContext);

  return (
    <Box p={6}>
      <Box p={6} mb={6} display="flex" alignItems="center" gap={6}>
        <Button colorScheme="teal" onClick={onOpen}>
          Modifier l'événement
        </Button>

        {isEventPast ? (
          <Tooltip label="J'y été" aria-label="Événement passé">
            <IconButton
              icon={<CheckIcon />}
              aria-label="Événement passé"
              colorScheme="gray"
              onClick={() => handleEventStatus(event.id, "attended")}
            />
          </Tooltip>
        ) : (
          <>
            <Tooltip
              label="Activer les notifications"
              aria-label="Activer les notifications"
            >
              <IconButton
                icon={<BellIcon />}
                aria-label="Activer les notifications"
                colorScheme="yellow"
                onClick={() => handleEventStatus(event.id, "interested")}
              />
            </Tooltip>
            <Tooltip
              label="Ajouter au calendrier"
              aria-label="Ajouter au calendrier"
            >
              <IconButton
                icon={<CalendarIcon />}
                aria-label="Ajouter au calendrier"
                colorScheme="red"
                onClick={() => handleEventStatus(event.id, "going")}
              />
            </Tooltip>
          </>
        )}
      </Box>

      <DetailHeader title={event.title} imageUrl={event.poster_image} />

      <Box mt={6} p={4} bg="white" borderRadius="md" boxShadow="md">
        <Heading as="h2" size="lg" mb={4}>
          Informations sur l'événement
        </Heading>
        <VStack spacing={4} align="start">
          <Text fontSize="lg">
            <strong>Date de début:</strong>{" "}
            {new Date(event.start_date).toLocaleDateString()}
          </Text>
          <Text fontSize="lg">
            <strong>Heure de début:</strong> {event.start_time}
          </Text>
          <Text fontSize="lg">
            <strong>Lieu:</strong> {event.location_name}
          </Text>
          <Text fontSize="lg">
            <strong>Description:</strong> {event.description}
          </Text>
          {event.price_prevent && (
            <Text fontSize="lg">
              <strong>Prix en prévente:</strong> {event.price_prevent} €
            </Text>
          )}
          {event.price_at_door && (
            <Text fontSize="lg">
              <strong>Prix sur place:</strong> {event.price_at_door} €
            </Text>
          )}
          {event.ticket_link && (
            <Text fontSize="lg">
              <strong>Billets:</strong>{" "}
              <a
                href={event.ticket_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Acheter des billets
              </a>
            </Text>
          )}
          {event.facebook_link && (
            <Text fontSize="lg">
              <strong>Facebook:</strong>{" "}
              <a
                href={event.facebook_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Voir l'événement sur Facebook
              </a>
            </Text>
          )}
        </VStack>
      </Box>

      <Divider my={6} />

      <ArtistTable artists={artists} />

      {/* Modal pour la modification */}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        motionPreset="slideInRight"
        size={{ base: "full", md: "5xl" }}
      >
        <ModalOverlay />
        <EditEventForm event={event} onClose={onClose} />
      </Modal>
    </Box>
  );
}

export default EventDetail;
