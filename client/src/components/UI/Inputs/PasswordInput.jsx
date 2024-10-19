import PropTypes from "prop-types";
import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";

function TextInput({
  id,
  label,
  placeholder,
  isRequired,
  value,
  handleChange,
}) {
  const [show, setShow] = useState(false);

  return (
    <FormControl id={id} isRequired={isRequired}>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <InputGroup>
        <Input
          type={show ? "text" : "password"}
          // props
          name={id}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
        <InputRightElement>
          <Button onClick={() => setShow(!show)}>Show</Button>
        </InputRightElement>
      </InputGroup>
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
