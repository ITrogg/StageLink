import { useLoaderData } from "react-router-dom";
import { Box, Heading, Flex } from "@chakra-ui/react";
import EventCard from "../../components/Detail/EventCard";

function EventList() {
  const events = useLoaderData();

  return (
    <Box p={6}>
      <Heading as="h1" size="2xl" textAlign="center">
        Liste des Événements
      </Heading>
      <Flex wrap="wrap" justifyContent="center" gap={6} mt={12}>
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </Flex>
    </Box>
  );
}

export default EventList;
