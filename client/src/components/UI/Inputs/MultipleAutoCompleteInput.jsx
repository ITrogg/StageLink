import { useState, useEffect } from "react";
import {
  HStack,
  Tag,
  TagLabel,
  TagCloseButton,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import PropTypes from "prop-types";
import AutoCompleteInput from "./AutoCompleteInput";
import connexion from "../../../services/connexion";

function SelectMultiple({
  id,
  label,
  placeholder,
  selectedItemIds,
  setSelectedItemIds,
  url,
  queryForTags,
  queryForInput,
  displayedValue,
  setDisplayedValue,
}) {
  const [newValue, setNewValue] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const getLabel = async () => {
      try {
        const fetchedItems = await Promise.all(
          selectedItemIds.map(async (itemId) => {
            const response = await connexion.get(
              `${url}/${itemId}${queryForTags}`
            );
            return response.data;
          })
        );
        setSelectedItems(fetchedItems);
      } catch (err) {
        console.error("Erreur lors de la récupération des éléments:", err);
      }
    };

    getLabel();
  }, [selectedItemIds, queryForInput, queryForTags, url]);

  const handleAddItem = async () => {
    if (newValue && !selectedItemIds.includes(newValue)) {
      try {
        const response = await connexion.get(
          `${url}/${newValue}${queryForTags}`
        );
        const itemDetails = response.data;

        setSelectedItems((prevItems) => [...prevItems, itemDetails]);
        setSelectedItemIds((prevIds) => [...prevIds, newValue]);
        setNewValue("");
      } catch (err) {
        console.error(
          "Erreur lors de la récupération des détails de l'élément:",
          err
        );
      }
    }
  };

  const handleRemoveItem = (itemId) => {
    setSelectedItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId)
    );
    setSelectedItemIds((prevIds) =>
      prevIds.filter((thisId) => thisId !== itemId)
    );
  };

  return (
    <>
      <HStack spacing={2} mt={4} alignItems="end">
        <AutoCompleteInput
          id={`${id}_input`}
          label={label}
          setValue={setNewValue}
          placeholder={placeholder}
          url={url}
          query={queryForInput}
          displayedValue={displayedValue}
          setDisplayedValue={setDisplayedValue}
        />
        <IconButton
          icon={<AddIcon />}
          colorScheme="purple"
          aria-label="Ajouter"
          onClick={handleAddItem}
          height={{ base: "2.5rem", md: "3rem" }}
          width={{ base: "2.5rem", md: "3rem" }}
        />
      </HStack>

      <HStack spacing={2} mt={4} align="start" wrap="wrap">
        {selectedItems.map((item) => (
          <Tag
            size="lg"
            key={item.id}
            borderRadius="full"
            variant="solid"
            colorScheme="pink"
          >
            <TagLabel>{item.label}</TagLabel>
            <TagCloseButton onClick={() => handleRemoveItem(item.id)} />
          </Tag>
        ))}
      </HStack>
    </>
  );
}

SelectMultiple.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  selectedItemIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  setSelectedItemIds: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  queryForTags: PropTypes.string.isRequired,
  queryForInput: PropTypes.string.isRequired,
  displayedValue: PropTypes.string.isRequired,
  setDisplayedValue: PropTypes.func.isRequired,
};

export default SelectMultiple;
