import { Select, SelectComponent } from "chakra-react-select";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";

type SearchableSelectType = {
  id: string;
  label: string;
  errorMessage?: string;
} & SelectComponent;
export function SearchableSelect({
  id,
  label,
  errorMessage,
  ...selectProps
}: SearchableSelectType) {
  return (
    <FormControl id={id} isInvalid={errorMessage !== undefined}>
      <FormLabel marginTop="24px" htmlFor="suburbs">
        {label}
      </FormLabel>
      <Select isMulti errorBorderColor="red" closeMenuOnSelect={false} {...selectProps} />
      <FormErrorMessage role="error">{errorMessage}</FormErrorMessage>
    </FormControl>
  );
}
