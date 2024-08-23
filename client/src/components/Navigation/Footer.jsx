import { Box, Text, Link, VStack, HStack } from "@chakra-ui/react";

function Footer() {
  return (
    <Box bg="black" color="white" py={8}>
      <VStack spacing={4}>
        <Text fontSize="lg" fontWeight="bold">
          Mon Application
        </Text>
        <Text fontSize="sm">
          © 2024 Mon Application. Tous droits réservés.
        </Text>
        <HStack spacing={4}>
          <Link
            href="/mentions-legales"
            fontSize="sm"
            color="gray.400"
            _hover={{ color: "white" }}
          >
            Mentions Légales
          </Link>
          <Link
            href="/politique-confidentialite"
            fontSize="sm"
            color="gray.400"
            _hover={{ color: "white" }}
          >
            Politique de Confidentialité
          </Link>
          <Link
            href="/contact"
            fontSize="sm"
            color="gray.400"
            _hover={{ color: "white" }}
          >
            Contact
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
}

export default Footer;
