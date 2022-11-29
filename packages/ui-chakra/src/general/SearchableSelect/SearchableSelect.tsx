import { AsyncSelect, AsyncSelectComponent } from "chakra-react-select";
import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";

type SearchableSelectType = {
  id: string;
  label: string;
  errorMessage?: string;
} & AsyncSelectComponent;

export function SearchableSelect({ id, label, errorMessage, ...props }: SearchableSelectType) {
  return (
    <FormControl id={id} isInvalid={errorMessage !== undefined}>
      <FormLabel marginTop="24px" htmlFor="suburbs">
        {label}
      </FormLabel>
      <AsyncSelect isMulti errorBorderColor="red" closeMenuOnSelect={false} {...props} />
      <FormErrorMessage role="error">{errorMessage}</FormErrorMessage>
    </FormControl>
  );
}
