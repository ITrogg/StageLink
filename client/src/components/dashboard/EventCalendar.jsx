import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // Pour les interactions

function EventCalendar() {
  const [events, setEvents] = useState([
    { title: "Événement 1", date: "2024-09-01" },
    { title: "Événement 2", date: "2024-09-15" },
  ]);

  const handleEventClick = () => {
    setEvents();
  };

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto" }}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick} // Appelle une fonction lorsque l'utilisateur clique sur une date
      />
    </div>
  );
}

export default EventCalendar;
