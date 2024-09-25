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
        // props
        name={id}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        // style
        borderColor="gray.800"
        bg="none"
        borderRadius="md"
        _hover={{
          borderColor: "purple.200",
        }}
        _focus={{
          borderColor: "purple.600",
          boxShadow: "none",
          outline: "none",
          bg: "white",
        }}
        _placeholder={{ color: "gray.500" }}
        size={{ base: "md", md: "lg" }}
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
