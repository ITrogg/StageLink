import { Box, Heading, Text, VStack, Divider } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import DetailHeader from "../../../components/Detail/DetailHeader";
import ArtistTable from "../../../components/Detail/ArtistTable";

function EventDetail() {
  const [event, artists] = useLoaderData();

  return (
    <Box p={6}>
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
    </Box>
  );
}

export default EventDetail;
