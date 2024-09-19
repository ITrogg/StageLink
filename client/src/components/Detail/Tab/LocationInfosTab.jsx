import PropTypes from "prop-types";
import { Box, VStack, Text, Divider } from "@chakra-ui/react";

function LocationInfosTab({ location }) {
  return (
    <Box p={4} bg="white" borderRadius="md" boxShadow="md">
      <VStack spacing={4} align="center">
        <Text fontSize="2xl" fontWeight="bold">
          {location.name}
        </Text>
        <Text fontSize="lg">{location.address}</Text>
        {location.city && <Text fontSize="md">{location.city}</Text>}
        {location.country && <Text fontSize="md">{location.country}</Text>}
        {location.postal_code && (
          <Text fontSize="md">{location.postal_code}</Text>
        )}
        {location.description && (
          <Text fontSize="md" color="gray.600">
            {location.description}
          </Text>
        )}

        <Divider my={4} />
      </VStack>
    </Box>
  );
}

LocationInfosTab.propTypes = {
  location: PropTypes.shape({
    name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string,
    country: PropTypes.string,
    postal_code: PropTypes.string,
    description: PropTypes.string,
    website: PropTypes.string,
    facebook_link: PropTypes.string,
    instagram_link: PropTypes.string,
    twitter_link: PropTypes.string,
  }).isRequired,
};

export default LocationInfosTab;
