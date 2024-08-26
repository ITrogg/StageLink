import PropTypes from "prop-types";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";

function InputComponent({
  id,
  label,
  type,
  placeholder,
  isRequired,
  value,
  setValue,
}) {
  return (
    <FormControl id={id} isRequired={isRequired}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Input
        name={id}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
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

InputComponent.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};

export default InputComponent;
