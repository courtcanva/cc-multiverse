import { Select as ReactSelect, createFilter } from "chakra-react-select";
import { Select } from "@chakra-ui/react";
import { Controller } from "react-hook-form";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { useState } from "react";

const SearchBar = ({ options, control }: { options: { value: number; label: string }[] }) => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  return (
    <Controller
      control={control}
      name="suburbs"
      rules={{ required: "Please select at least one suburb" }}
      render={({ field: { onChange, value, name }, fieldState: { error } }) => (
        <FormControl isInvalid={!!error} id="suburbs">
          <FormLabel>Select Area Filter Mode</FormLabel>
          <Select onChange={onChange}>
            <option value="INCLUDE">Include Mode</option>
            {/* <option value="exclude">Exclude Area</option> */}
          </Select>
          <FormLabel marginTop="24px">Search Area</FormLabel>
          <ReactSelect
            isMulti
            instanceId="SuburbSelect"
            name={name}
            onChange={onChange}
            value={value}
            options={options}
            placeholder={"Please input your address or suburb"}
            components={{ DropdownIndicator: () => null }}
            closeMenuOnSelect={false}
            onInputChange={(value) => {
              if (value) {
                setMenuIsOpen(true);
              } else {
                setMenuIsOpen(false);
              }
            }}
            menuIsOpen={menuIsOpen}
            filterOption={createFilter({ matchFrom: "start" })}
          />
          <FormErrorMessage>{error && error.message}</FormErrorMessage>
        </FormControl>
      )}
    />
  );
};

export default SearchBar;
