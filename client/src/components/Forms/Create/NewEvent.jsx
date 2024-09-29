import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Heading } from "@chakra-ui/react";

import AddNameAndDate from "./Add/AddNameAndDate";
import AddPlace from "./Add/AddPlace";
import AddMoreDetails from "./Add/AddMoreDetails";
import AddArtists from "./Add/AddArtists";

import connexion from "../../../services/connexion";
import { AuthContext } from "../../../services/AuthContext";

function AddEventForm() {
  const { user } = useContext(AuthContext);
  const [newEvent, setNewEvent] = useState({ createdBy: user.id });
  const [artistIds, setArtistIds] = useState([]);
  const navigate = useNavigate();

  const handleChange = (id, value) => {
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [id]: value,
    }));
  };

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
    <>
      <Heading as="h1" size="lg" mb={6} textAlign="center">
        Ajouter un événement
      </Heading>
      <AddPlace newEvent={newEvent} handleChange={handleChange} />
      <AddNameAndDate newEvent={newEvent} handleChange={handleChange} />
      <AddArtists artistIds={artistIds} setArtistIds={setArtistIds} />
      <AddMoreDetails newEvent={newEvent} handleChange={handleChange} />
      <Button colorScheme="blue" mt={6} onClick={handleSubmit} size="lg">
        Ajouter l'événement
      </Button>
    </>
  );
}

export default AddEventForm;
