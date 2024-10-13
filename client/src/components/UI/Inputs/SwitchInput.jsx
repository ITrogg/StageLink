import PropTypes from "prop-types";
import { FormControl, FormLabel, Switch } from "@chakra-ui/react";

function SwitchInput({ id, label, handleChange, value }) {
  return (
    <FormControl id={id}>
      <FormLabel>{label}</FormLabel>
      <Switch onChange={handleChange} isChecked={value} />
    </FormControl>
  );
}

SwitchInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  value: PropTypes.bool,
};

export default SwitchInput;
