import PropTypes from "prop-types";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

function DateInput({ id, label, isRequired, value, handleChange }) {
  return (
    <FormControl id={id} isRequired={isRequired}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Input
        type="date"
        // props
        name={id}
        value={value}
        onChange={handleChange}
      />
    </FormControl>
  );
}

DateInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default DateInput;
