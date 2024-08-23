import PropTypes from "prop-types";
import { Box, Image, Heading } from "@chakra-ui/react";

function DetailHeader({ title, imageUrl }) {
  return (
    <Box textAlign="center" mb={6}>
      {imageUrl && (
        <Image src={imageUrl} alt={title} borderRadius="md" mb={4} />
      )}
      <Heading as="h1" size="xl" mb={2}>
        {title}
      </Heading>
    </Box>
  );
}

DetailHeader.propTypes = {
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
};

DetailHeader.defaultProps = {
  imageUrl: "",
};

export default DetailHeader;
