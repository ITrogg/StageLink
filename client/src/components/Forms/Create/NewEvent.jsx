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
  Text,
  useBreakpointValue,
  Textarea, // Import du composant Textarea de Chakra UI
} from "@chakra-ui/react";
import InputComponent from "../../UI/Inputs/InputComponent";
import MultipleAutoCompleteInput from "../../UI/Inputs/MultipleAutoCompleteInput";
import AutoCompleteInput from "../../UI/Inputs/AutoCompleteInput";
import CreateArtist from "./CreateArtist";
import connexion from "../../../services/connexion";
import { AuthContext } from "../../../services/AuthContext";
import CreatePlace from "./CreatePlace";

function AddEventForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [locationId, setLocationId] = useState("");
  const [displayedLocation, setDisplayedLocation] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [posterImage, setPosterImage] = useState("");
  const [pricePrevent, setPricePrevent] = useState("");
  const [priceAtDoor, setPriceAtDoor] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [ticketLink, setTicketLink] = useState("");
  const [isFree, setIsFree] = useState(false);
  const [isMultipleDays, setIsMultipleDays] = useState(false);
  const [artistIds, setArtistIds] = useState([]);
  const [displayedArtist, setDisplayedArtist] = useState("");

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const spacing = useBreakpointValue({ base: 4, md: 6 });

  const handleAddArtist = (artist) => {
    setArtistIds((prevIds) => [...prevIds, artist]);
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
      <VStack spacing={spacing} align="stretch">
        {/* Titre */}
        <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.50">
          <Text fontWeight="bold" mb={2}>
            Nom de l'événement
          </Text>
          <FormControl mb={4}>
            <InputComponent
              id="title"
              type="text"
              label="Donne un titre à l'événement"
              placeholder="Concert quelque part"
              value={title}
              setValue={setTitle}
              isRequired
            />
          </FormControl>
        </Box>

        {/* Quand */}
        <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.50">
          <Text fontWeight="bold" mb={2}>
            Quand ?
          </Text>
          <FormControl mb={4}>
            <InputComponent
              id="start_date"
              label="Date de début"
              type="date"
              placeholder="Date de début"
              value={startDate}
              setValue={setStartDate}
              isRequired
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
              m={4}
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
                isRequired
              />
            )}
          </FormControl>
        </Box>

        {/* Où */}
        <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.50">
          <Text fontWeight="bold" mb={2}>
            Où ?
          </Text>
          <FormControl mb={4}>
            <AutoCompleteInput
              id="location"
              label="Lieu"
              placeholder="Le Zénith"
              isRequired
              setValue={setLocationId}
              url="api/location"
              query="?type=forInput"
              displayedValue={displayedLocation}
              setDisplayedValue={setDisplayedLocation}
            />
          </FormControl>
          <Accordion allowToggle mt={4}>
            <AccordionItem>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  Ajouter un lieu
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <CreatePlace />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>

        {/* Qui */}
        <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.50">
          <Text fontWeight="bold" mb={2}>
            Qui ?
          </Text>
          <FormControl mb={4}>
            <MultipleAutoCompleteInput
              id="artists"
              label="Artistes"
              placeholder="Mozart"
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
                  <CreateArtist onArtistAdded={handleAddArtist} />
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </FormControl>
        </Box>

        {/* Combien */}
        <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.50">
          <Text fontWeight="bold" mb={2}>
            Combien ?
          </Text>
          <FormControl mb={4}>
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
            <FormControl id="is_free" mb={4}>
              <Switch
                m={4}
                isChecked={isFree}
                onChange={(e) => {
                  setIsFree(e.target.checked);
                  if (e.target.checked) {
                    setPricePrevent("");
                    setPriceAtDoor("");
                  }
                }}
              >
                Événement gratuit ou à prix libre
              </Switch>
            </FormControl>
          </FormControl>
        </Box>

        {/* Détails supplémentaires */}
        <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.50">
          <Text fontWeight="bold" mb={2}>
            Détails supplémentaires
          </Text>
          <FormControl mb={4}>
            <FormLabel htmlFor="description">Description</FormLabel>
            <Textarea
              id="description"
              placeholder="Description de l'événement"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              bg="none"
              borderColor="gray.300"
              _focus={{
                borderColor: "pink.500",
                boxShadow: "none",
                outline: "none",
              }}
              fontSize="md"
              lineHeight="1.5"
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
        </Box>

        <Button colorScheme="blue" mt={6} onClick={handleSubmit} size="lg">
          Ajouter l'événement
        </Button>
      </VStack>
    </Box>
  );
}

export default AddEventForm;
