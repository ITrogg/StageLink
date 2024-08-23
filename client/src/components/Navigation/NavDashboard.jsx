import { Link, useLocation } from "react-router-dom";
import { Flex, HStack, Icon, Text, useBreakpointValue } from "@chakra-ui/react";
import { CalendarIcon, StarIcon, ChatIcon, InfoIcon } from "@chakra-ui/icons";

function NavDashboard() {
  const { pathname } = useLocation();
  const isDesktop = useBreakpointValue({ base: false, md: true });

  const navItems = [
    {
      path: "/dashboard",
      icon: InfoIcon,
      label: "Mon profil",
      color: "red.500",
    },
    {
      path: "/dashboard/agenda",
      icon: CalendarIcon,
      label: "Mon agenda",
      color: "yellow.400",
    },
    {
      path: "/dashboard/favorites",
      icon: StarIcon,
      label: "Mes favoris",
      color: "green.400",
    },
    {
      path: "/dashboard/friends",
      icon: ChatIcon,
      label: "Mes ami·es",
      color: "teal.300",
    },
  ];

  const desktopNav = (
    <Flex
      as="nav"
      direction="column"
      width="250px"
      bg="blackAlpha.900"
      color="white"
      p={4}
      height="100%"
    >
      {navItems.map((item) => (
        <Link key={item.path} to={item.path}>
          <Flex
            align="center"
            p={2}
            mb={2}
            borderRadius="md"
            color={pathname === item.path ? item.color : "white"}
            _hover={{
              backgroundColor: pathname !== item.path ? "gray.700" : undefined,
            }}
          >
            <Icon as={item.icon} boxSize={6} mr={3} />
            <Text fontSize="lg">{item.label}</Text>
          </Flex>
        </Link>
      ))}
    </Flex>
  );

  const mobileNav = (
    <Flex
      as="nav"
      position="fixed"
      bottom={0}
      width="100%"
      bg="blackAlpha.900"
      color="white"
      p={3}
      justify="space-around"
    >
      {navItems.map((item) => (
        <Link key={item.path} to={item.path} style={{ textDecoration: "none" }}>
          <HStack
            spacing={1}
            color={pathname === item.path ? item.color : "white"}
          >
            <Icon as={item.icon} boxSize={6} />
          </HStack>
        </Link>
      ))}
    </Flex>
  );

  return isDesktop ? desktopNav : mobileNav;
}

export default NavDashboard;
