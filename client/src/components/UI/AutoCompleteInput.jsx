import PropTypes from "prop-types";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import connexion from "../../services/connexion";

function AutoCompleteInput({
  id,
  label,
  value,
  setValue,
  placeholder,
  isRequired,
  url,
}) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const getOptions = async () => {
      try {
        const response = await connexion.get(url);
        setOptions(response.data);
      } catch (err) {
        throw new Error(err);
      }
    };
    getOptions();
  }, [url]);

  return (
    <FormControl id={id} isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      <Input
        name={id}
        list="autocomplete-list"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        bg="white"
        borderColor="gray.300"
        _hover={{ borderColor: "blue.500", boxShadow: "0 0 0 1px blue.500" }}
        _focus={{
          borderColor: "blue.500",
          boxShadow: "none",
          outline: "none",
        }}
        _placeholder={{ color: "gray.500" }}
        size="lg"
      />
      <datalist id="autocomplete-list">
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </datalist>
    </FormControl>
  );
}

AutoCompleteInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  url: PropTypes.string.isRequired,
};

AutoCompleteInput.defaultProps = {
  isRequired: false,
  placeholder: "",
};

export default AutoCompleteInput;
