import { Outlet } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";
import NavDashboard from "../../components/Navigation/NavDashboard";

function DashboardLayout() {
  return (
    <Flex>
      <Box as="aside" height="100vh">
        <NavDashboard />
      </Box>
      <Box as="main" flex="1" p={4}>
        <Outlet />
      </Box>
    </Flex>
  );
}

export default DashboardLayout;
