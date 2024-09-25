import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Heading } from "@chakra-ui/react";
import connexion from "../../../services/connexion";
import { AuthContext } from "../../../services/AuthContext";
import AddMoreDetails from "./Add/AddMoreDetails";
import AddArtists from "./Add/AddArtists";

function AddEventForm() {
  const { user } = useContext(AuthContext);
  const [newEvent, setNewEvent] = useState({ createdBy: user.id });
  const [artistIds, setArtistIds] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await connexion.post("/api/event", newEvent);
      const eventId = response.data;
      await Promise.all(
        artistIds.map((artistId) =>
          connexion.post("api/eventArtist", {
            artist_id: artistId,
            event_id: eventId,
          })
        )
      );
      navigate(`/evenements/${eventId}`);
    } catch (err) {
      console.error("Erreur lors de l'ajout de l'événement :", err);
    }
  };

  return (
    <Box
      m={6}
      p={4}
      borderWidth="1px"
      borderRadius="md"
      bg="white"
      shadow="md"
      maxWidth="800px"
      mx="auto"
    >
      <Heading as="h1" size="lg" mb={6} textAlign="center">
        Ajouter un événement
      </Heading>

      <AddArtists artistIds={artistIds} setArtistIds={setArtistIds} />
      <AddMoreDetails newEvent={newEvent} setNewEvent={setNewEvent} />
      <Button colorScheme="blue" mt={6} onClick={handleSubmit} size="lg">
        Ajouter l'événement
      </Button>
    </Box>
  );
}

export default AddEventForm;
