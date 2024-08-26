import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
  Box,
  Image,
  Text,
  VStack,
  HStack,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BellIcon, CalendarIcon, CheckIcon } from "@chakra-ui/icons";
import connexion from "../../services/connexion";

function EventCard({ event }) {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    async function getArtists() {
      try {
        const response = await connexion.get(
          `/api/artist?type=byEvent&eventId=${event.id}`
        );
        setArtists(response.data);
      } catch (error) {
        console.error("Failed to fetch artists:", error);
      }
    }

    getArtists();
  }, [event.id]);

  const isPastEvent = new Date(event.start_date) < new Date();

  return (
    <Box
      as={Link}
      to={`/evenements/${event.id}`}
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
      transition="all 0.2s"
      maxW="300px"
      width="100%"
      position="relative"
    >
      <Image
        src={event.poster_image}
        alt={event.title || "Événement"}
        objectFit="cover"
        width="100%"
        height="200px"
      />
      <Box p="6">
        <VStack align="start" spacing="2">
          <Text fontWeight="bold" fontSize="lg" isTruncated>
            {event.title || "Titre inconnu"}
          </Text>
          <Text color="gray.600" fontSize="sm">
            {event.location_name || "Lieu inconnu"}
          </Text>
          <Text color="gray.500" fontSize="sm">
            {new Date(event.start_date).toLocaleDateString()}
          </Text>
          <HStack spacing="2" wrap="wrap">
            {artists.map((artist) => (
              <Text
                key={artist.id}
                color="black"
                fontWeight="bold"
                fontSize="sm"
              >
                {artist.name}
              </Text>
            ))}
          </HStack>
        </VStack>
      </Box>
      <Box position="absolute" top="2" right="2" display="flex" gap="2">
        {isPastEvent ? (
          <Tooltip label="Événement passé" aria-label="Événement passé">
            <IconButton icon={<CheckIcon />} aria-label="Événement passé" />
          </Tooltip>
        ) : (
          <>
            <Tooltip
              label="Ajouter au calendrier"
              aria-label="Ajouter au calendrier"
            >
              <IconButton
                icon={<CalendarIcon />}
                aria-label="Ajouter au calendrier"
              />
            </Tooltip>
            <Tooltip
              label="Activer les notifications"
              aria-label="Activer les notifications"
            >
              <IconButton
                icon={<BellIcon />}
                aria-label="Activer les notifications"
              />
            </Tooltip>
          </>
        )}
      </Box>
    </Box>
  );
}

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    location_name: PropTypes.string,
    poster_image: PropTypes.string,
    start_date: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventCard;
