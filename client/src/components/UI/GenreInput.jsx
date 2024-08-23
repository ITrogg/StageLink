import PropTypes from "prop-types";
import { Input } from "@chakra-ui/react";

function GenreInput({ value, onChange }) {
  return (
    <Input
      value={value}
      onChange={onChange}
      placeholder="Rechercher par genre"
      bg="white"
      borderColor="gray.300"
      _focus={{ borderColor: "blue.500" }}
    />
  );
}

GenreInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default GenreInput;
