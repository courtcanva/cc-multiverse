import { Select } from "chakra-react-select";

const SearchBar = ({ suburbs, handleSelect }) => {
  return (
    <Select
      isMulti
      options={suburbs}
      components={{ DropdownIndicator: () => null }}
      placeholder="Please enter address"
      noOptionsMessage={() => "Suburb not found"}
      onChange={handleSelect}
    />
  );
};

export default SearchBar;
