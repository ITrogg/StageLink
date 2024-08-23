import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";
import FilterTags from "./FilterTags";

function SearchBlock({ filters, onFilterRemove, children }) {
  return (
    <Box>
      <FilterTags tags={filters} onRemoveTag={onFilterRemove} />
      {children}
    </Box>
  );
}

SearchBlock.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFilterRemove: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default SearchBlock;
