import { useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Button,
  IconButton,
  useDisclosure,
  Image,
} from "@chakra-ui/react";

import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import logo from "../../assets/images/logo.svg";

import { AuthContext } from "../../services/AuthContext";

function NavbarExplore() {
  const { logout } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      onClose();
    }
    // Désactivation d'ES Lint pour ne pas mettre isOpen et onClose dans les dépendances
    // eslint-disable-next-line
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/welcome");
  };

  return (
    <Box bg="black" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box>
          <Link to="/">
            <Image src={logo} alt="Logo" height="40px" />
          </Link>
        </Box>
        {/* Menu desktop */}
        <Flex
          alignItems="center"
          display={{ base: "none", md: "flex" }}
          justifyContent="space-between"
          gap="12"
          color="white"
        >
          <Link to="/artistes">Artistes</Link>
          <Link to="/salles">Lieux</Link>
          <Link to="/evenements">Événements</Link>
          <Link to="/dashboard">Mon Profil</Link>
          <Button
            colorScheme="white"
            variant="outline"
            ml={4}
            onClick={handleLogout}
          >
            Déconnexion
          </Button>
        </Flex>
        {/* Burger icon */}
        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>
      {/* Mobile Menu */}
      {isOpen ? (
        <Box
          mt={4}
          pb={4}
          display={{ base: "flex", md: "none" }}
          flexDirection="column"
          color="white"
          gap={6}
        >
          <Link to="artistes">Artistes</Link>
          <Link to="/salles">Lieux</Link>
          <Link to="/evenements">Événements</Link>
          <Link to="/dashboard">Mon Profil</Link>
          <Button
            colorScheme="red.500"
            variant="outline"
            onClick={handleLogout}
          >
            Déconnexion
          </Button>
        </Box>
      ) : null}
    </Box>
  );
}

export default NavbarExplore;
