import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  VStack,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Switch,
} from "@chakra-ui/react";
import InputComponent from "../../components/UI/InputComponent";
import MultipleAutoCompleteInput from "../../components/UI/MultipleAutoCompleteInput";
import AddArtist from "../../components/Forms/AddArtist";
import AddLocation from "../../components/Forms/AddLocation";

import connexion from "../../services/connexion";
import { AuthContext } from "../../services/AuthContext";
import AutoCompleteInput from "../../components/UI/AutoCompleteInput";

function AddEventForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [locationId, setLocationId] = useState("");
  const [displayedLocation, setDisplayedLocation] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [posterImage, setPosterImage] = useState(null);
  const [pricePrevent, setPricePrevent] = useState(null);
  const [priceAtDoor, setPriceAtDoor] = useState(null);
  const [facebookLink, setFacebookLink] = useState(null);
  const [ticketLink, setTicketLink] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [isMultipleDays, setIsMultipleDays] = useState(false);
  const [artistIds, setArtistIds] = useState([]);
  const [displayedArtist, setDisplayedArtist] = useState("");

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAddArtist = (artist) => {
    setArtistIds((prevIds) => [...prevIds, artist]);
  };

  const handleAddLocation = (newLocationId, locationName) => {
    setLocationId(newLocationId);
    setDisplayedLocation(locationName);
  };

  const handleSubmit = async () => {
    try {
      setCreatedBy(parseInt(user.id, 10));
      const newEvent = {
        title,
        description,
        start_date: startDate,
        end_date: endDate,
        start_time: startTime,
        location_id: locationId,
        created_by: createdBy,
        poster_image: posterImage,
        price_prevent: isFree ? null : pricePrevent,
        price_at_door: isFree ? null : priceAtDoor,
        facebook_link: facebookLink,
        ticket_link: ticketLink,
        is_free: isFree,
      };
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
      console.error("Erreur lors de l'ajout de l'événement:", err);
    }
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" bg="white" shadow="md">
      <Heading as="h1" size="md" mb={4}>
        Ajouter un événement
      </Heading>
      <VStack spacing={4} align="start">
        <InputComponent
          id="title"
          label="Titre"
          type="text"
          placeholder="Titre de l'événement"
          value={title}
          setValue={setTitle}
        />
        {/* Quand */}
        <FormControl as="fieldset">
          <InputComponent
            id="start_date"
            label="Date de début"
            type="date"
            placeholder="Date de début"
            value={startDate}
            setValue={setStartDate}
          />

          <InputComponent
            id="start_time"
            label="Heure de début"
            type="time"
            placeholder="Heure de début"
            value={startTime}
            setValue={setStartTime}
          />

          <Switch
            isChecked={isMultipleDays}
            onChange={(e) => setIsMultipleDays(e.target.checked)}
          >
            Sur plusieurs jours
          </Switch>

          {isMultipleDays && (
            <InputComponent
              id="end_date"
              label="Date de fin"
              type="date"
              placeholder="Date de fin"
              value={endDate}
              setValue={setEndDate}
              isRequired={isMultipleDays}
            />
          )}
        </FormControl>
        {/* où */}
        <FormControl as="fieldset">
          <AutoCompleteInput
            id="location"
            label="Lieu"
            placeholder="salle"
            isRequired
            setValue={setLocationId}
            url="api/location"
            query="?type=forInput"
            displayedValue={displayedLocation}
            setDisplayedValue={setDisplayedLocation}
          />
          <Accordion allowToggle mt={4}>
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Ajouter une salle
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <AddLocation onLocationAdded={handleAddLocation} />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </FormControl>
        {/* qui */}
        <FormControl as="fieldset">
          <MultipleAutoCompleteInput
            id="artists"
            label="Artistes"
            placeholder="nouvel artiste"
            selectedItemIds={artistIds}
            setSelectedItemIds={setArtistIds}
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

        <Button colorScheme="blue" mt={4} onClick={handleSubmit}>
          Ajouter l'événement
        </Button>
      </VStack>
    </Box>
  );
}

export default AddEventForm;
