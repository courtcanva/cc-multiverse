import React from "react";
import {
  FormControl,
  FormLabel,
  Input as CKInput,
  InputProps as CKInputProps,
  FormHelperText,
  FormErrorMessage,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";

type GroupInputProps = {
  label: string;
  id: string;
  placeholder: string;
  addon: string;
  role?: string;
  type?: string;
  helperText?: string;
  errorMessage?: string;
} & CKInputProps;
export const FormGroupInput = React.forwardRef(function FormGroupInput(
  { isRequired, label, helperText, errorMessage, addon, ...inputProps }: GroupInputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <FormControl isRequired={isRequired} isInvalid={errorMessage !== undefined}>
      <FormLabel htmlFor={label}>{label}</FormLabel>
      <InputGroup>
        <InputLeftAddon>{addon}</InputLeftAddon>
        <CKInput {...inputProps} ref={ref} />
      </InputGroup>
      <FormHelperText>{helperText}</FormHelperText>
      <FormErrorMessage role="error">{errorMessage}</FormErrorMessage>
    </FormControl>
  );
});
