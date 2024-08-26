import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { Box, Heading, Flex } from "@chakra-ui/react";
import EventCard from "../../components/Detail/EventCard";
import Input from "../../components/UI/InputComponent";

function EventList() {
  const events = useLoaderData();
  const [dateFilter, setDateFilter] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const filterEvents = () => {
      // Si une date est sélectionnée
      if (dateFilter) {
        const formattedDateFilter = new Date(dateFilter)
          .toISOString()
          .split("T")[0];

        const filtered = events.filter((event) => {
          const eventDate = new Date(event.start_date)
            .toISOString()
            .split("T")[0];
          return eventDate === formattedDateFilter;
        });

        setFilteredEvents(filtered);
      } else {
        setFilteredEvents(events);
      }
    };

    filterEvents();
  }, [dateFilter, events]);

  return (
    <Box p={6}>
      <Heading as="h1" size="2xl" textAlign="center">
        Liste des Événements
      </Heading>
      <Box
        w={{ base: "80vw", md: "40vw" }}
        border="1px solid"
        borderColor="gray.300"
        boxShadow="lg"
        borderRadius="md"
        mt={4}
        p={4}
        mx={{ base: "auto", md: "0" }}
        ml={{ md: "auto" }}
      >
        <Input
          id="date"
          label="Filtrer par date"
          type="date"
          value={dateFilter}
          setValue={setDateFilter}
        />
      </Box>
      <Flex wrap="wrap" justifyContent="center" gap={6} mt={12}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))
        ) : (
          <Box textAlign="center" width="100%">
            Pas d'événements pour cette date.
          </Box>
        )}
      </Flex>
    </Box>
  );
}

export default EventList;
