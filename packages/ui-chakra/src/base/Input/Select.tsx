import React from "react";
import {
  FormControl,
  FormLabel,
  Select as CKSelect,
  SelectProps as CKSelectProps,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";

type SelectProps = {
  title: string;
  id: string;
  placeholder: string;
  helperText?: string;
  errorMessage?: string;
  options: string[];
} & CKSelectProps;
export const FormSelect = React.forwardRef(function FormSelect(
  {
    isRequired,
    title,
    placeholder,
    helperText,
    errorMessage,
    options,
    ...selectProps
  }: SelectProps,
  ref: React.ForwardedRef<HTMLSelectElement>
) {
  return (
    <FormControl isRequired={isRequired} isInvalid={errorMessage !== undefined}>
      <FormLabel>{title}</FormLabel>
      <CKSelect variant="outline" placeholder={placeholder} {...selectProps} ref={ref}>
        {options.map((option, index) => (
          <option key={option + index} value={option}>
            {option}
          </option>
        ))}
      </CKSelect>
      <FormHelperText>{helperText}</FormHelperText>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
});
