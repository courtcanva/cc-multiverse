import {
  FormControl,
  FormLabel,
  Select as CKSelect,
  SelectProps as CKSelectProps,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";

export type SelectOption = {
  value: string;
  label: string;
};
type SelectProps = {
  isRequired?: boolean;
  label: string;
  helperText?: string;
  errorMessage?: string;
  options: SelectOption[];
} & CKSelectProps;
export function Select({
  isRequired,
  label,
  helperText,
  errorMessage,
  options,
  ...selectProps
}: SelectProps) {
  return (
    <FormControl isRequired={isRequired} isInvalid={errorMessage !== undefined}>
      <FormLabel>{label}</FormLabel>

      <CKSelect {...selectProps}>
        {options.map((option, index) => (
          <option key={option.value + index} value={option.value}>
            {option.label}
          </option>
        ))}
      </CKSelect>

      <FormHelperText>{helperText}</FormHelperText>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
}
