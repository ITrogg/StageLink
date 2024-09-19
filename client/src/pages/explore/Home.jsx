import { useContext } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { AuthContext } from "../../services/AuthContext";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <Box textAlign="center" mb={12}>
      <Heading as="h1" size="2xl" mb={4}>
        Bonjour {user ? user.username : "Invité"}
      </Heading>
    </Box>
  );
}

export default Home;
