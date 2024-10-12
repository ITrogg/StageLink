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

DateInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default DateInput;
