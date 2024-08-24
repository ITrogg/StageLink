import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, FormControl, Text } from "@chakra-ui/react";

import connexion from "../../services/connexion";
import InputElement from "../UI/InputComponent";

function Connection() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await connexion.post("api/user/login", { email, password });

      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
        navigate("/");
      } else {
        setError("Erreur de connexion. Veuillez réessayer");
      }
    } catch (err) {
      setError("Erreur de connexion. Veuillez réessayer.");
    }
  };

  return (
    <Container p={5}>
      <FormControl>
        <InputElement
          label="Adresse Email"
          type="email"
          placeholder="exemple@mail.com"
          value={email}
          setValue={setEmail}
        />
        <InputElement
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
