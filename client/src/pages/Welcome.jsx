import { Flex, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";

import Connection from "../components/Forms/Authentification/Connection";
import Inscription from "../components/Forms/Authentification/SignIn";

import backgroundImage from "../assets/images/background.jpg";

function Welcome() {
  const [newUser, setNewUser] = useState(false);
  const [messageInscription, setMessageInscription] = useState(null);

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
        color="red.600"
        textAlign={{ base: "center", md: "left" }}
        flex="1"
      >
        Bienvenue sur StageLink.
      </Heading>
      <Flex
        flexDirection="column"
        justifyContent="space-between"
        bg="gray.200"
        p={8}
        borderRadius="md"
        color="black"
        minW={{ base: "90%", md: "50%" }}
        minH="60vh"
        flex="1"
      >
        <Text>{messageInscription}</Text>
        {newUser ? (
          <Inscription
            setMessage={setMessageInscription}
            setForm={setNewUser}
          />
        ) : (
          <Connection />
        )}
        <Text
          as="button"
          fontSize="lg"
          color="red.800"
          display="block"
          onClick={() => setNewUser(!newUser)}
        >
          {newUser ? "Déjà inscrit·e ?" : "Pas encore de compte ?"}
        </Text>
      </Flex>
    </Flex>
  );
}

export default Welcome;
