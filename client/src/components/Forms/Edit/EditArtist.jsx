import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ModalBody,
  ModalFooter,
  Button,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  SimpleGrid,
} from "@chakra-ui/react";
import PropTypes from "prop-types";

import InputComponent from "../../UI/Inputs/InputComponent"; // Assure-toi que ce chemin est correct
import SelectMultiple from "../../UI/Inputs/MultipleAutoCompleteInput";
import connexion from "../../../services/connexion";

function EditArtist({ onClose, artist, genreTags }) {
  const [formData, setFormData] = useState({
    logo: artist.logo || "",
    genre: artist.genre || "",
    facebook_link: artist.facebook_link || "",
    twitter_link: artist.twitter_link || "",
    instagram_link: artist.instagram_link || "",
    website: artist.website || "",
    youtube_link: artist.youtube_link || "",
    bandcamp_link: artist.bandcamp_link || "",
    spotify_link: artist.spotify_link || "",
    deezer_link: artist.deezer_link || "",
    apple_music_link: artist.apple_music_link || "",
    amazon_music_link: artist.amazon_music_link || "",
  });
  const [tagsNames, setTagsNames] = useState("");
  const initialTags = genreTags.map((tag) => tag.id);
  const [tagsIds, setTagsIds] = useState(initialTags);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await connexion.put(`/api/artist/${artist.id}`, formData);

      const tagsToAdd = tagsIds.filter((id) => !initialTags.includes(id));
      const tagsToRemove = initialTags.filter((id) => !tagsIds.includes(id));

      if (tagsToAdd.length > 0) {
        await Promise.all(
          tagsToAdd.map((genreTagId) =>
            connexion.post(`api/artistGenreTag`, {
              artist_id: artist.id,
              genre_tag_id: genreTagId,
            })
          )
        );
      }

      if (tagsToRemove.length > 0) {
        await Promise.all(
          tagsToRemove.map((genreTagId) =>
            connexion.delete(
              `api/artistGenreTag?artistId=${artist.id}&genreId=${genreTagId}`
            )
          )
        );
      }

      navigate(`/artistes/${artist.id}`);
      onClose();
    } catch (err) {
      console.error("Erreur lors de la mise à jour de l'artiste:", err);
    }
  };

  return (
    <ModalContent>
      <ModalHeader>Modifier les informations de l'artiste</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <SelectMultiple
          id="tags"
          label="Ajouter des tags"
          placeholder="genre"
          selectedItemIds={tagsIds}
          setSelectedItemIds={setTagsIds}
          url="api/genreTag"
          queryForTags=""
          queryForInput=""
          displayedValue={tagsNames}
          setDisplayedValue={setTagsNames}
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
          id="genre"
          label="Genre"
          type="text"
          placeholder="Genre musical"
          value={formData.genre}
          setValue={(value) =>
            setFormData((prevData) => ({ ...prevData, genre: value }))
          }
          isRequired
        />
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <InputComponent
            id="facebook_link"
            label="Lien Facebook"
            type="text"
            placeholder="Lien Facebook"
            value={formData.facebook_link}
            setValue={(value) =>
              setFormData((prevData) => ({
                ...prevData,
                facebook_link: value,
              }))
            }
          />
          <InputComponent
            id="twitter_link"
            label="Lien Twitter"
            type="text"
            placeholder="Lien Twitter"
            value={formData.twitter_link}
            setValue={(value) =>
              setFormData((prevData) => ({
                ...prevData,
                twitter_link: value,
              }))
            }
          />
          <InputComponent
            id="instagram_link"
            label="Lien Instagram"
            type="text"
            placeholder="Lien Instagram"
            value={formData.instagram_link}
            setValue={(value) =>
              setFormData((prevData) => ({
                ...prevData,
                instagram_link: value,
              }))
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
            id="youtube_link"
            label="Lien YouTube"
            type="text"
            placeholder="Lien YouTube"
            value={formData.youtube_link}
            setValue={(value) =>
              setFormData((prevData) => ({
                ...prevData,
                youtube_link: value,
              }))
            }
          />
          <InputComponent
            id="bandcamp_link"
            label="Lien Bandcamp"
            type="text"
            placeholder="Lien Bandcamp"
            value={formData.bandcamp_link}
            setValue={(value) =>
              setFormData((prevData) => ({
                ...prevData,
                bandcamp_link: value,
              }))
            }
          />
          <InputComponent
            id="spotify_link"
            label="Lien Spotify"
            type="text"
            placeholder="Lien Spotify"
            value={formData.spotify_link}
            setValue={(value) =>
              setFormData((prevData) => ({
                ...prevData,
                spotify_link: value,
              }))
            }
          />
          <InputComponent
            id="deezer_link"
            label="Lien Deezer"
            type="text"
            placeholder="Lien Deezer"
            value={formData.deezer_link}
            setValue={(value) =>
              setFormData((prevData) => ({ ...prevData, deezer_link: value }))
            }
          />
          <InputComponent
            id="apple_music_link"
            label="Lien Apple Music"
            type="text"
            placeholder="Lien Apple Music"
            value={formData.apple_music_link}
            setValue={(value) =>
              setFormData((prevData) => ({
                ...prevData,
                apple_music_link: value,
              }))
            }
          />
          <InputComponent
            id="amazon_music_link"
            label="Lien Amazon Music"
            type="text"
            placeholder="Lien Amazon Music"
            value={formData.amazon_music_link}
            setValue={(value) =>
              setFormData((prevData) => ({
                ...prevData,
                amazon_music_link: value,
              }))
            }
          />
        </SimpleGrid>
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

EditArtist.propTypes = {
  onClose: PropTypes.func.isRequired,
  artist: PropTypes.shape({
    id: PropTypes.number.isRequired,
    logo: PropTypes.string,
    genre: PropTypes.string,
    facebook_link: PropTypes.string,
    twitter_link: PropTypes.string,
    instagram_link: PropTypes.string,
    website: PropTypes.string,
    youtube_link: PropTypes.string,
    bandcamp_link: PropTypes.string,
    spotify_link: PropTypes.string,
    deezer_link: PropTypes.string,
    apple_music_link: PropTypes.string,
    amazon_music_link: PropTypes.string,
  }).isRequired,
  genreTags: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    })
  ).isRequired,
};

export default EditArtist;
