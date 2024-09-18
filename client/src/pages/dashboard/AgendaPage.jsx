import { useContext, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { AuthContext } from "../../services/AuthContext";

import EventCalendar from "../../components/dashboard/EventCalendar";
import EventCard from "../../components/Detail/EventCard";

import connexion from "../../services/connexion";

function AgendaPage() {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchEvents = async () => {
        try {
          const response = await connexion.get(
            `/api/event?type=byUser&userId=${user.id}`
          );
          const eventsData = response.data.map((event) => ({
            title: event.title,
            start: new Date(event.start_date),
            end: event.end_date ? new Date(event.end_date) : null,
            id: event.id,
            location_name: event.name,
            poster_image: event.poster_image,
          }));
          setEvents(eventsData);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des événements :",
            error
          );
        }
      };

      fetchEvents();
    }
  }, [user]);

  return (
    <Box>
      <EventCalendar
        events={events}
        onEventClick={(event) => setSelectedEvent(event)}
      />

      {selectedEvent && <EventCard event={selectedEvent} />}
    </Box>
  );
}

export default AgendaPage;
