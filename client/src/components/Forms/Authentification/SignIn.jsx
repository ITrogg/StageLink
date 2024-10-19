import { useState } from "react";
import PropTypes from "prop-types";
import { Container, Button, FormControl, Text } from "@chakra-ui/react";

import InputElement from "../../UI/Inputs/TextInput";

import connexion from "../../../services/connexion";

function Inscription({ setMessage, setForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Les mots de passe doivent correspondre");
    } else {
      try {
        await connexion.post("api/user", { email, username, password });
        setMessage(
          "Inscription effective, connectez vous pour accèder au site"
        );
        setForm(false);
      } catch (err) {
        setError("Erreur d'inscription. Veuillez réessayer.");
      }
    }
  };

  return (
    <Container>
      <FormControl>
        <InputElement
          label="Pseudonyme"
          type="text"
          placeholder="DavidBowieFan59"
          value={username}
          setValue={setUsername}
        />
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
        <InputElement
          label="Confirmer le mot de Passe"
          type="password"
          value={confirmPassword}
          setValue={setConfirmPassword}
        />
        {error && <Text color="red">{error}</Text>}
        <Button mt={4} colorScheme="red" onClick={handleSubmit}>
          Créer un compte
        </Button>
      </FormControl>
    </Container>
  );
}

Inscription.propTypes = {
  setMessage: PropTypes.func.isRequired,
  setForm: PropTypes.func.isRequired,
};

export default Inscription;
