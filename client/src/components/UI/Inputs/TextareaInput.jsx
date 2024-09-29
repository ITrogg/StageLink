import PropTypes from "prop-types";
import { FormControl, FormLabel, Textarea } from "@chakra-ui/react";

function TextareaInput({
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
      <Textarea
        name={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
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
    </FormControl>
  );
}

TextareaInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default TextareaInput;
