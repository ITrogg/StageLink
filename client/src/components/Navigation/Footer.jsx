import { Box, Text, VStack } from "@chakra-ui/react";

function Footer() {
  return (
    <Box bg="black" color="white" py={8}>
      <VStack spacing={4} align="center">
        <Text fontSize="lg" fontWeight="bold">
          StageLink
        </Text>
        <Text fontSize="sm" textAlign="center">
          © 2024 StageLink. Tous droits réservés.
          <br />
          Si tu cherches quelque chose et que tu ne le trouves pas ici, c'est
          probablement parce qu'on a oublié de le mettre...
        </Text>
      </VStack>
    </Box>
  );
}

export default Footer;
