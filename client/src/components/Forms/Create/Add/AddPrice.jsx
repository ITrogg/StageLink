import PropTypes from "prop-types";

import { Box, FormControl, Switch, Text } from "@chakra-ui/react";

import InputComponent from "../../../UI/Inputs/TextInput";

function AddPrice({ newEvent, handleChange }) {
  const { priceAtDoor, pricePrevent, isFree } = newEvent;
  return (
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
              handleChange={(e) => handleChange("pricePrevent", e.target.value)}
            />
            <InputComponent
              id="price_at_door"
              label="Prix à la porte"
              type="number"
              placeholder="Prix à la porte"
              value={priceAtDoor}
              handleChange={(e) => handleChange("priceAtDoor", e.target.value)}
            />
          </>
        )}
        <FormControl id="is_free" mb={4}>
          <Switch
            m={4}
            isChecked={isFree}
            onChange={(e) => {
              handleChange("isFree", e.target.checked);
              if (e.target.checked) {
                handleChange("pricePrevent", "");
                handleChange("priceAtDoor", "");
              }
            }}
          >
            Événement gratuit ou à prix libre
          </Switch>
        </FormControl>
      </FormControl>
    </Box>
  );
}

AddPrice.propTypes = {
  newEvent: PropTypes.shape({
    priceAtDoor: PropTypes.string,
    pricePrevent: PropTypes.string,
    isFree: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default AddPrice;
