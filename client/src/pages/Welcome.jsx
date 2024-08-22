import { Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

import Connection from "../components/Forms/Connection";
import Inscription from "../components/Forms/SignIn";

import backgroundImage from "../assets/images/background.jpg";

function Welcome() {
  const [newUser, setnewUser] = useState(false);

  return (
    <Flex
      minH="100vh"
      bgImage={`url(${backgroundImage})`}
      bgSize="cover"
      bgPosition="center"
      p={{ base: 8, md: 36 }}
      flexDirection={{ base: "column", md: "row" }}
      alignItems="center"
      justifyContent="space-around"
    >
      <Heading
        as="h1"
        size="2xl"
        color="teal"
        textAlign={{ base: "center", md: "left" }}
        flex="1"
      >
        Bienvenue sur StageLink.
      </Heading>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        bg="blue.50"
        p={8}
        borderRadius="md"
        color="black"
        minW={{ base: "90%", md: "50%" }}
        minH="60vh"
        flex="1"
      >
        {newUser ? <Inscription /> : <Connection />}
        <Text
          as="button"
          fontSize="lg"
          color="red.800"
          display="block"
          onClick={() => setnewUser(!newUser)}
        >
          {newUser ? "Déjà inscrit·e ?" : "Pas encore de compte ?"}
        </Text>
      </Flex>
    </Flex>
  );
}

export default Welcome;
