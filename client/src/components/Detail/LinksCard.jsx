import PropTypes from "prop-types";
import { Box, Link, Text } from "@chakra-ui/react";

function LinksCard({ links }) {
  const hasLinks = Array.isArray(links) && links.length > 0;

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" bg="white">
      {hasLinks ? (
        links.map(({ title, url }) =>
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
        )
      ) : (
        <Text fontSize="lg" color="gray.500">
          Aucun lien disponible
        </Text>
      )}
    </Box>
  );
}

// Définir les PropTypes
LinksCard.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string,
    })
  ).isRequired,
};

export default LinksCard;
