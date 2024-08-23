import PropTypes from "prop-types";
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import EventCard from "../EventCard";

function EventTab({ pastEvents, futureEvents }) {
  return (
    <Box>
      <Heading as="h2" size="lg" mb={4}>
        Concerts à venir
      </Heading>
      <Flex wrap="wrap" gap={4}>
        {futureEvents.length > 0 ? (
          futureEvents.map((event) => (
            <Box key={event.id} flex="1 1 200px">
              <EventCard event={event} />
            </Box>
          ))
        ) : (
          <Text>Aucun événement futur</Text>
        )}
      </Flex>

      <Heading as="h2" size="lg" mt={8} mb={4}>
        Concerts passés
      </Heading>
      <Flex wrap="wrap" gap={4}>
        {pastEvents.length > 0 ? (
          pastEvents.map((event) => (
            <Box key={event.id} flex="1 1 200px">
              <EventCard event={event} />
            </Box>
          ))
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
