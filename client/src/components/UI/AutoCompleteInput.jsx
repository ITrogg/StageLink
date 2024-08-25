import PropTypes from "prop-types";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import connexion from "../../services/connexion";

function AutoCompleteInput({
  id,
  label,
  displayedValue,
  setDisplayedValue,
  setValue,
  placeholder,
  isRequired,
  url,
  query,
}) {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    const getOptions = async () => {
      try {
        const response = await connexion.get(url + query);
        setOptions(response.data);
      } catch (err) {
        throw new Error(err);
      }
    };
    getOptions();
  }, [url, query]);

  const handleOptionSelect = (e) => {
    const selectedOption = options.find(
      (option) => option.label === e.target.value
    );
    if (selectedOption) {
      setValue(selectedOption.id);
      setDisplayedValue(selectedOption.label);
    } else {
      setDisplayedValue(e.target.value);
    }
  };

  return (
    <FormControl id={id} isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      <Input
        name={id}
        list={`autocomplete-list-${id}`}
        value={displayedValue}
        onChange={handleOptionSelect}
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
      <datalist id={`autocomplete-list-${id}`}>
        {options.map((option) => (
          <option key={option.id} value={option.label}>
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
  setValue: PropTypes.func.isRequired,
  setDisplayedValue: PropTypes.func.isRequired,
  displayedValue: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  url: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
};

export default AutoCompleteInput;
