import PropTypes from "prop-types";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

function TextInput({
  id,
  label,
  placeholder,
  isRequired,
  value,
  handleChange,
}) {
  return (
    <FormControl id={id} isRequired={isRequired}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Input
        type="text"
        // props
        name={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </FormControl>
  );
}

TextInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default TextInput;
