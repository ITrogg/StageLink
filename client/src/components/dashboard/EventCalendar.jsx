import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"; // Pour les interactions

function EventCalendar({ events, onEventClick }) {
  const handleEventClick = (info) => {
    onEventClick({
      id: info.event.id,
      title: info.event.title,
      start_date: info.event.startStr,
      end_date: info.event.endStr || null,
      location_name: info.event.extendedProps.location_name,
      poster_image: info.event.extendedProps.poster_image,
    });
  };

  return (
    <Box>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={handleEventClick}
      />
    </Box>
  );
}

EventCalendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      start: PropTypes.instanceOf(Date).isRequired,
      end: PropTypes.instanceOf(Date),
      location_name: PropTypes.string,
      poster_image: PropTypes.string,
    })
  ).isRequired,
  onEventClick: PropTypes.func.isRequired,
};

export default EventCalendar;
