import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Heading,
  useSteps,
  Box,
  Step,
  Stepper,
  StepStatus,
  StepIndicator,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  StepSeparator,
  ButtonGroup,
} from "@chakra-ui/react";

import AddNameAndDate from "./Add/AddNameAndDate";
import AddPlace from "./Add/AddPlace";
import AddArtists from "./Add/AddArtists";
import AddMoreDetails from "./Add/AddMoreDetails";

import connexion from "../../../services/connexion";
import { AuthContext } from "../../../services/AuthContext";

const steps = [
  {
    title: "Quand",
    description: "Ajoute un titre et une date",
    component: AddNameAndDate,
  },
  { title: "Où", description: "Ajoute un lieu", component: AddPlace },
  {
    title: "Qui",
    description: "Ajoute un·e ou plusieurs artistes",
    component: AddArtists,
  },
  {
    title: "Détails",
    description: "Ajoute des détails",
    component: AddMoreDetails,
  },
];

function AddEventForm() {
  const { user } = useContext(AuthContext);
  const [newEvent, setNewEvent] = useState({ createdBy: user.id });
  const [artistIds, setArtistIds] = useState([]);
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

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

  const StepComponent = steps[activeStep].component;

  return (
    <>
      <Heading>Ajouter un événement</Heading>
      <Stepper index={activeStep}>
        {steps.map((step) => (
          <Step key={step.index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <StepComponent
        newEvent={newEvent}
        handleChange={handleChange}
        artistIds={artistIds}
        setArtistIds={setArtistIds}
      />
      {activeStep < steps.length - 1 ? null : (
        <Button onClick={handleSubmit}>Ajouter l'événement</Button>
      )}
      <ButtonGroup>
        <Button
          onClick={() => setActiveStep(activeStep - 1)}
          isDisabled={activeStep === 0}
        >
          Précédent
        </Button>
        <Button
          onClick={() => setActiveStep(activeStep + 1)}
          isDisabled={activeStep === steps.length - 1}
        >
          Suivant
        </Button>
      </ButtonGroup>
    </>
  );
}

export default AddEventForm;
