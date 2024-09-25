import PropTypes from "prop-types";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import connexion from "../../../services/connexion";

function SelectComponent({
  id,
  url,
  label,
  value,
  setValue,
  placeholder,
  isRequired,
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
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <Select
        name={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        bg="none"
        borderColor="grey.800"
        _focus={{ borderColor: "pink.500", boxShadow: "0 0 0 1px pink.500" }}
        size={{ base: "md", md: "lg" }}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}

SelectComponent.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
};

export default SelectComponent;
