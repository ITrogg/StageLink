import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ModalBody,
  ModalFooter,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

import InputComponent from "../../UI/Inputs/InputComponent"; // Assure-toi que ce chemin est correct
import connexion from "../../../services/connexion";

function EditLocation({ onClose, location }) {
  const [formData, setFormData] = useState({
    capacity: location.capacity || null,
    facebook_link: location.facebook_link || null,
    twitter_link: location.twitter_link || null,
    instagram_link: location.instagram_link || null,
    website: location.website || null,
    logo: location.logo || null,
    year_opened: location.year_opened || null,
    is_closed: location.is_closed || false,
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const handleSubmit = async () => {
    try {
      await connexion.put(`/api/location/${id}`, formData);
      navigate(`/salles/${id}`);
      onClose();
    } catch (err) {
      console.error("Erreur lors de la mise à jour du lieu:", err);
    }
  };

  return (
    <ModalContent>
      <ModalHeader>Ajouter des information</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <InputComponent
          id="capacity"
          label="Capacité"
          type="number"
          placeholder="Capacité du lieu"
          value={formData.capacity}
          setValue={(value) =>
            setFormData((prevData) => ({ ...prevData, capacity: value }))
          }
        />
        <InputComponent
          id="facebook_link"
          label="Lien Facebook"
          type="text"
          placeholder="Lien Facebook"
          value={formData.facebook_link}
          setValue={(value) =>
            setFormData((prevData) => ({ ...prevData, facebook_link: value }))
          }
        />
        <InputComponent
          id="twitter_link"
          label="Lien Twitter"
          type="text"
          placeholder="Lien Twitter"
          value={formData.twitter_link}
          setValue={(value) =>
            setFormData((prevData) => ({ ...prevData, twitter_link: value }))
          }
        />
        <InputComponent
          id="instagram_link"
          label="Lien Instagram"
          type="text"
          placeholder="Lien Instagram"
          value={formData.instagram_link}
          setValue={(value) =>
            setFormData((prevData) => ({ ...prevData, instagram_link: value }))
          }
        />
        <InputComponent
          id="website"
          label="Site web"
          type="text"
          placeholder="Site web"
          value={formData.website}
          setValue={(value) =>
            setFormData((prevData) => ({ ...prevData, website: value }))
          }
        />
        <InputComponent
          id="logo"
          label="Logo"
          type="text"
          placeholder="URL du logo"
          value={formData.logo}
          setValue={(value) =>
            setFormData((prevData) => ({ ...prevData, logo: value }))
          }
        />
        <InputComponent
          id="year_opened"
          label="Année d'ouverture"
          type="number"
          placeholder="Année d'ouverture"
          value={formData.year_opened}
          setValue={(value) =>
            setFormData((prevData) => ({ ...prevData, year_opened: value }))
          }
        />
        <FormControl mb={4}>
          <FormLabel>Lieu fermé</FormLabel>
          <Checkbox
            id="is_closed"
            isChecked={formData.is_closed}
            onChange={(checked) =>
              setFormData((prevData) => ({ ...prevData, year_opened: checked }))
            }
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
          Sauvegarder
        </Button>
        <Button variant="outline" onClick={onClose}>
          Annuler
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}

EditLocation.propTypes = {
  onClose: PropTypes.func.isRequired,
  location: PropTypes.shape().isRequired,
};

export default EditLocation;
