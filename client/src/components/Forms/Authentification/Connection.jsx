import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, FormControl, Text } from "@chakra-ui/react";

import InputComponent from "../../UI/Inputs/TextInput";

import { AuthContext } from "../../../services/AuthContext";

function Connection() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login(email, password);
    if (success) {
      navigate("/");
    }
  };

  return (
    <Container p={5}>
      <FormControl>
        <InputComponent
          id="email"
          label="Adresse Email"
          type="email"
          placeholder="exemple@mail.com"
          value={email}
          setValue={setEmail}
        />
        <InputComponent
          id="password"
          label="Mot de Passe"
          type="password"
          value={password}
          setValue={setPassword}
        />
        {error && (
          <Text color="red.500" mt={4}>
            {error}
          </Text>
        )}
        <Button mt={4} colorScheme="red" onClick={handleSubmit}>
          Connexion
        </Button>
      </FormControl>
    </Container>
  );
}

export default Connection;
