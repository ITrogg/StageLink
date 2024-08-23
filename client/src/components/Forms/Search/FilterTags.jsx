import PropTypes from "prop-types";
import { Tag, TagCloseButton, TagLabel, HStack } from "@chakra-ui/react";

function FilterTags({ tags, onRemoveTag }) {
  return (
    <HStack spacing={2} mb={4}>
      {tags.map((tag) => (
        <Tag
          key={tag}
          size="md"
          borderRadius="full"
          variant="solid"
          colorScheme="teal"
        >
          <TagLabel>{tag}</TagLabel>
          <TagCloseButton onClick={() => onRemoveTag(tag)} />
        </Tag>
      ))}
    </HStack>
  );
}

FilterTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onRemoveTag: PropTypes.func.isRequired,
};

export default FilterTags;
