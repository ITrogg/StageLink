import PropTypes from "prop-types";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import EventCard from "../EventCard";

function EventTab({ pastEvents, futureEvents }) {
  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>
        Concerts à venir
      </Heading>
      <Flex p={12} wrap="wrap" gap={12}>
        {futureEvents.length > 0 ? (
          futureEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <Text>Aucun événement futur</Text>
        )}
      </Flex>

      <Heading as="h2" size="lg" mt={8} mb={4}>
        Concerts passés
      </Heading>
      <Flex p={12} wrap="wrap" gap={12}>
        {pastEvents.length > 0 ? (
          pastEvents.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <Text>Aucun événement passé</Text>
        )}
      </Flex>
    </Box>
  );
}

EventTab.propTypes = {
  pastEvents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      location_name: PropTypes.string,
      poster_image: PropTypes.string,
      start_date: PropTypes.string.isRequired,
    })
  ).isRequired,
  futureEvents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      location_name: PropTypes.string,
      poster_image: PropTypes.string,
      start_date: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default EventTab;
