import PropTypes from "prop-types";
import { Box, Link, Text } from "@chakra-ui/react";

function LinkCard({ links }) {
  return (
    <Box p={4} borderWidth="1px" borderRadius="md" bg="white">
      {links.map(({ title, url }) =>
        url ? (
          <Box key={title} mb={2}>
            <Link href={url} isExternal>
              <Text
                fontSize="lg"
                color="blue.500"
                _hover={{ textDecoration: "underline" }}
              >
                {title}
              </Text>
            </Link>
          </Box>
        ) : null
      )}
    </Box>
  );
}

LinkCard.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string,
    })
  ).isRequired,
};

export default LinkCard;
