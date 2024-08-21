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

function Connection() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await connexion.post("api/user/login", { email, password });
      localStorage.setItem("authToken", res.data.token);
      navigate("/");
    } catch (err) {
      setError("Erreur de connexion. Veuillez réessayer.");
    }
  };

  return (
    <Box p={5}>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormLabel>Mot de passe</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Text color="red.500" mt={4}>
            {error}
          </Text>
        )}
        <Button mt={4} colorScheme="teal" onClick={handleSubmit}>
          Connexion
        </Button>
      </FormControl>
    </Box>
  );
}

export default Connection;
