import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";

import connexion from "../services/connexion";

function Inscription() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await connexion.post("api/user", { email, username, password });
      navigate("/connexion");
    } catch (err) {
      setError("Erreur d'inscription. Veuillez réessayer.");
    }
  };

  return (
    <Box>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormLabel>Mot de Passe</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Text color="red" mt={4}>
            {error}
          </Text>
        )}
        <Button mt={4} colorScheme="teal" onClick={handleSubmit}>
          Créer un compte
        </Button>
      </FormControl>
    </Box>
  );
}

export default Inscription;
