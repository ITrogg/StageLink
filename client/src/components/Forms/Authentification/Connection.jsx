import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, FormControl, Text } from "@chakra-ui/react";

import TextInput from "../../UI/Inputs/TextInput";
import PasswordInput from "../../UI/Inputs/PasswordInput";

import { AuthContext } from "../../../services/AuthContext";
import SimpleButton from "../../UI/Buttons/SimpleButton";

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
        <TextInput
          id="email"
          label="Adresse Email"
          placeholder="exemple@mail.com"
          isRequired
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          id="password"
          label="Mot de Passe"
          isRequired
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Text color="red.500" mt={4}>
            {error}
          </Text>
        )}
        <SimpleButton handleClick={handleSubmit} text="Connexion" />
      </FormControl>
    </Container>
  );
}

export default Connection;
