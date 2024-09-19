import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Switch,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import InputComponent from "./Inputs/InputComponent";
import MultipleAutoCompleteInput from "./Inputs/MultipleAutoCompleteInput";
import AddArtist from "./AddArtist";

import connexion from "../../services/connexion";

function EditEvent({ event, onClose }) {
  const [description, setDescription] = useState(event.description);
  const [startTime, setStartTime] = useState(event.start_time);
  const [posterImage, setPosterImage] = useState(event.poster_image);
  const [pricePrevent, setPricePrevent] = useState(event.price_prevent);
  const [priceAtDoor, setPriceAtDoor] = useState(event.price_at_door);
  const [facebookLink, setFacebookLink] = useState(event.facebook_link);
  const [ticketLink, setTicketLink] = useState(event.ticket_link);
  const [isFree, setIsFree] = useState(event.is_free);
  const [newArtistIds, setNewArtistIds] = useState([]);
  const [displayedArtist, setDisplayedArtist] = useState("");
  const navigate = useNavigate();

  const handleAddArtist = (artist) => {
    setNewArtistIds((prevIds) => [...prevIds, artist]);
  };

  const handleSubmit = async () => {
    try {
      const updatedEvent = {
        description,
        start_time: startTime,
        poster_image: posterImage,
        price_prevent: isFree ? null : pricePrevent,
        price_at_door: isFree ? null : priceAtDoor,
        facebook_link: facebookLink,
        ticket_link: ticketLink,
        is_free: isFree,
      };
      await connexion.put(`/api/event/${event.id}`, updatedEvent);

      await Promise.all(
        newArtistIds.map((artistId) =>
          connexion.post("api/eventArtist", {
            artist_id: artistId,
            event_id: event.id,
          })
        )
      );
      navigate(`/evenements/${event.id}`);
      onClose();
    } catch (err) {
      console.error("Erreur lors de l'ajout de l'événement:", err);
    }
  };

  return (
    <ModalContent>
      <ModalHeader as="h2" size="md" mb={4}>
        Ajouter un événement
      </ModalHeader>
      <ModalCloseButton />
      <ModalBody spacing={4} align="start">
        {/* Quand */}
        <InputComponent
          id="start_time"
          label="Heure de début"
          type="time"
          placeholder="Heure de début"
          value={startTime}
          setValue={setStartTime}
        />

        {/* qui */}
        <FormControl as="fieldset">
          <MultipleAutoCompleteInput
            id="artists"
            label="Artistes"
            placeholder="nouvel artiste"
            selectedItemIds={newArtistIds}
            setSelectedItemIds={setNewArtistIds}
            queryForTags="?type=forTag"
            url="api/artist"
            queryForInput="?type=forInput"
            displayedValue={displayedArtist}
            setDisplayedValue={setDisplayedArtist}
          />
          <Accordion allowToggle mt={4}>
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Ajouter des artistes
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <AddArtist onArtistAdded={handleAddArtist} />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </FormControl>
        {/* combien */}
        <FormControl as="fieldset">
          <FormControl id="is_free">
            <FormLabel>Gratuit</FormLabel>
            <Switch
              isChecked={isFree}
              onChange={(e) => {
                setIsFree(e.target.checked);
                if (e.target.checked) {
                  setPricePrevent("");
                  setPriceAtDoor("");
                }
              }}
            />
          </FormControl>

          {!isFree && (
            <>
              <InputComponent
                id="price_prevent"
                label="Prix en prévente"
                type="number"
                placeholder="Prix en prévente"
                value={pricePrevent}
                setValue={setPricePrevent}
              />

              <InputComponent
                id="price_at_door"
                label="Prix à la porte"
                type="number"
                placeholder="Prix à la porte"
                value={priceAtDoor}
                setValue={setPriceAtDoor}
              />
            </>
          )}
        </FormControl>
        {/* détail supllémentaire */}
        <FormControl as="fieldset">
          <InputComponent
            id="description"
            label="Description"
            type="textarea"
            placeholder="Description de l'événement"
            value={description}
            setValue={setDescription}
          />

          <InputComponent
            id="poster_image"
            label="Image de l'affiche"
            type="text"
            placeholder="URL de l'image"
            value={posterImage}
            setValue={setPosterImage}
          />
          <InputComponent
            id="facebook_link"
            label="Lien Facebook"
            type="text"
            placeholder="Lien vers la page Facebook"
            value={facebookLink}
            setValue={setFacebookLink}
          />

          <InputComponent
            id="ticket_link"
            label="Lien des billets"
            type="text"
            placeholder="Lien vers la page de vente des billets"
            value={ticketLink}
            setValue={setTicketLink}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={6} onClick={handleSubmit}>
          Mettre à jour l'événement
        </Button>
        <Button onClick={onClose}>Annuler</Button>
      </ModalFooter>
    </ModalContent>
  );
}

EditEvent.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    start_time: PropTypes.string.isRequired,
    poster_image: PropTypes.string.isRequired,
    price_prevent: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    price_at_door: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    facebook_link: PropTypes.string,
    ticket_link: PropTypes.string,
    is_free: PropTypes.bool.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditEvent;
