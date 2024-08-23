import { useLoaderData } from "react-router-dom";
import { Box, Heading, Flex } from "@chakra-ui/react";
import EventCard from "../../components/Detail/EventCard"; // Assure-toi que ce chemin est correct

function EventList() {
  const events = useLoaderData();

  return (
    <Box p={6}>
      <Heading as="h1" mb={6}>
        Liste des Événements
      </Heading>
      <Flex wrap="wrap" justifyContent="space-between" gap={6}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </Flex>
    </Box>
  );
}

export default EventList;
