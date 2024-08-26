import { Outlet, Navigate, Link, useLocation } from "react-router-dom";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import Footer from "../../components/Navigation/Footer";

function ConnectedLayout() {
  const token = localStorage.getItem("authToken");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/welcome" />;
  }
  return (
    <Flex bg="gray.100" direction="column" minH="95vh">
      <Box
        alignSelf="end"
        m={2}
        display={location.pathname === "/evenements/nouveau" ? "none" : "block"}
      >
        <Link to="/evenements/nouveau">
          <Text
            color="white"
            as={Button}
            bg="green.400"
            _hover={{ bg: "green.500" }}
          >
            Ajouter un évenement
          </Text>
        </Link>
      </Box>
      <Box flex="1">
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
}

export default ConnectedLayout;
