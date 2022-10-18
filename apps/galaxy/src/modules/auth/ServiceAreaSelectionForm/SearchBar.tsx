import { Select } from "chakra-react-select";
import { Controller } from "react-hook-form";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";

const SearchBar = ({ options, control }: { options: { value: number; label: string }[] }) => {
  return (
    <Controller
      control={control}
      name="suburbs"
      rules={{ required: "Please select at least one suburb" }}
      render={({ field: { onChange, value, name }, fieldState: { error } }) => (
        <FormControl isInvalid={!!error} id="suburbs">
          <FormLabel marginTop="24px">Search Area</FormLabel>
          <Select
            isMulti
            instanceId="SuburbSelect"
            name={name}
            onChange={onChange}
            value={value}
            options={options}
            placeholder={"Please input your address or suburb"}
            components={{ DropdownIndicator: () => null }}
            closeMenuOnSelect={false}
          />
          <FormErrorMessage>{error && error.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
};

export default SearchBar;
