import PropTypes from "prop-types";
import { Select as ChakraSelect } from "@chakra-ui/react";

function Select({ options, value, onChange, placeholder }) {
  return (
    <ChakraSelect
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      bg="white"
      borderColor="gray.300"
      _focus={{ borderColor: "blue.500" }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </ChakraSelect>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default Select;
