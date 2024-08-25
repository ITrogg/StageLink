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
      <FormLabel>{label}</FormLabel>
      <Input
        name={id}
        type={type}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        borderColor="gray.900"
        borderRadius="md"
        _hover={{ borderColor: "red.600", boxShadow: "0 0 0 1px teal.500" }}
        _focus={{
          borderColor: "red.600",
          boxShadow: "none",
          outline: "none",
        }}
        _placeholder={{ color: "gray.500" }}
        size="lg"
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
