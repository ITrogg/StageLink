import { useContext } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  SimpleGrid,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../services/AuthContext";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <Box bg="gray.100" minH="80vh" py={10}>
      <Container maxW="container.lg" centerContent>
        {/* En-tête */}
        <Box textAlign="center" mb={12}>
          <Heading as="h1" size="2xl" mb={4}>
            Bonjour {user ? user.username : "Invité"}
          </Heading>
          <Heading as="h2">Bon retour sur StageLink</Heading>
          <Text fontSize="lg" color="gray.600" mt={6}>
            Connecte-toi avec tes ami·es, découvre des artistes, et participe à
            des événements passionnants ! Que tu sois là pour explorer de
            nouveaux talents ou pour organiser ta prochaine grande soirée, tu es
            au bon endroit !
          </Text>
        </Box>

        {/* Fonctionnalités Clés */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={12}>
          <Box
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            bg="white"
            textAlign="center"
            display="flex"
            flexDirection="column"
          >
            <Box mb={4}>
              <Heading as="h3" size="md">
                Ajouter des Ami·es
              </Heading>
              <Text mt={2}>
                Trouve et ajoute des ami·es pour partager ensemble vos
                événements. Rends chaque moment spécial en les invitant à se
                joindre à toi pour des expériences inoubliables. Plus on est de
                fous, plus on rit !
              </Text>
            </Box>
            <Box mt="auto">
              <Button as={Link} to="" colorScheme="teal">
                Ajouter des Ami.es
              </Button>
            </Box>
          </Box>
          <Box
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            bg="white"
            textAlign="center"
            display="flex"
            flexDirection="column"
          >
            <Box mb={4}>
              <Heading as="h3" size="md">
                Découvrir des Événements
              </Heading>
              <Text mt={2}>
                Explore les événements autour de toi, inscrit-toi à ceux qui
                t'intéressent et partage-les avec tes ami·es. Des concerts aux
                festivals, il y a toujours quelque chose de palpitant à
                découvrir. Et qui sait, peut-être que tu trouveras ton prochain
                coup de cœur !
              </Text>
            </Box>
            <Box mt="auto">
              <Button as={Link} to="/evenements" colorScheme="pink">
                Découvrir des Événements
              </Button>
            </Box>
          </Box>
          <Box
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            bg="white"
            textAlign="center"
            display="flex"
            flexDirection="column"
          >
            <Box mb={4}>
              <Heading as="h3" size="md">
                Participer à des Événements
              </Heading>
              <Text mt={2}>
                Consulte les événements auxquels tu as prévu de participer et
                gère facilement tes plans. Reste à jour avec tes projets futurs
                et assure-toi de ne rien manquer. Tes prochaines aventures
                t'attendent !
              </Text>
            </Box>
            <Box mt="auto">
              <Button as={Link} to="/dashboard" colorScheme="blue">
                Mes Événements
              </Button>
            </Box>
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

export default Home;
