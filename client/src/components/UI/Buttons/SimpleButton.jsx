import { Button } from "@chakra-ui/react";
import PropTypes from "prop-types";

function SimpleButton({ handleClick, text }) {
  return (
    <Button mt={4} colorScheme="red" onClick={handleClick}>
      {text}
    </Button>
  );
}

SimpleButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default SimpleButton;
