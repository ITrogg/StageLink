import { useState } from "react";
import PropTypes from "prop-types";

import { Box, FormControl, Switch, Text } from "@chakra-ui/react";

import TextInput from "../../../UI/Inputs/TextInput";
import DateInput from "../../../UI/Inputs/DateInput";
import TimeInput from "../../../UI/Inputs/TimeInput";

function AddNameAndDate({ newEvent, handleChange }) {
  const { title, startDate, startTime, endDate } = newEvent;
  const [isMultipleDays, setIsMultipleDays] = useState(false);

  return (
    <Box borderWidth="1px" borderRadius="md" p={4} bg="gray.50">
      <Text fontWeight="bold" mb={2}>
        Nom de l'événement
      </Text>

      <TextInput
        id="title"
        label="Donne un titre à l'événement"
        placeholder="Concert quelque part"
        value={title}
        setValue={(e) => handleChange("tilte", e.target.value)}
        isRequired
      />
      <FormControl mb={4}>
        <DateInput
          id="startDate"
          label="Date de début"
          value={startDate}
          setValue={(e) => handleChange("startDate", e.target.value)}
          isRequired
        />
        <TimeInput
          id="startTime"
          label="Heure de début"
          placeholder="Heure de début"
          value={startTime}
          setValue={(e) => handleChange("startTime", e.target.value)}
        />
        <Switch
          isChecked={isMultipleDays}
          onChange={(e) => setIsMultipleDays(e.target.checked)}
        >
          Sur plusieurs jours
        </Switch>
        {isMultipleDays && (
          <DateInput
            id="endDate"
            label="Date de fin"
            value={endDate}
            setValue={(e) => handleChange("endDate", e.target.value)}
          />
        )}
      </FormControl>
    </Box>
  );
}

AddNameAndDate.propTypes = {
  newEvent: PropTypes.shape({
    title: PropTypes.string,
    endDate: PropTypes.string,
    startDate: PropTypes.string.isRequired,
    startTime: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default AddNameAndDate;
