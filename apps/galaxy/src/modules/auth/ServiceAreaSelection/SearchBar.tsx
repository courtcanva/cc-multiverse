import { Select } from "chakra-react-select";
import { Controller } from "react-hook-form";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";

export interface SuburbArray {
  value: number;
  label: string;
}

const SearchBar = ({ control, suburbs }: { control: any; suburbs: SuburbArray[] }) => {
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
            options={suburbs}
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
