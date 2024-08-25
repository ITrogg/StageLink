import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Box, Image, Text, VStack, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import connexion from "../../services/connexion";

function EventCard({ event }) {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    async function fetchArtists() {
      try {
        const response = await connexion.get(
          `/api/artist?type=byEvent&eventId=${event.id}`
        );
        setArtists(response.data);
      } catch (error) {
        console.error("Failed to fetch artists:", error);
      }
    }

    fetchArtists();
  }, [event.id]);

  return (
    <Box
      as={Link}
      to={`/evenements/${event.id}`}
      borderWidth="1px"
      borderRadius="md"
      overflow="hidden"
      _hover={{ boxShadow: "lg", transform: "scale(1.02)" }}
      transition="all 0.2s"
    >
      <Image
        src={event.logo}
        alt={event.location_name || "Événement"}
        objectFit="cover"
        width="100%"
        height="200px"
      />
      <Box p="6">
        <VStack align="start" spacing="2">
          <Text fontWeight="bold" fontSize="xl" isTruncated>
            {event.location_name || "Lieu inconnu"}
          </Text>
          <Text color="gray.600">
            {new Date(event.start_date).toLocaleDateString()}
          </Text>
          <HStack spacing="2">
            {artists.map((artist) => (
              <Text key={artist.id} color="blue.500" fontWeight="bold">
                {artist.name}
              </Text>
            ))}
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
}

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    location_name: PropTypes.string,
    logo: PropTypes.string,
    start_date: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventCard;
