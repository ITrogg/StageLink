import PropTypes from "prop-types";
import { FormLabel, Input } from "@chakra-ui/react";

function InputElement({ label, type, placeholder, value, setValue }) {
  return (
    <FormLabel>
      {label}
      <Input
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
    </FormLabel>
  );
}

InputElement.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
};
InputElement.defaultProps = {
  placeholder: "", // Valeur par défaut pour placeholder
};

export default InputElement;
