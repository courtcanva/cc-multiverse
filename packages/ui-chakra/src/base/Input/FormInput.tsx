import React from "react";
import {
  FormControl,
  FormLabel,
  Input as CKInput,
  InputProps as CKInputProps,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";

type InputProps = {
  label: string;
  id: string;
  placeholder: string;
  role?: string;
  type?: string;
  helperText?: string;
  errorMessage?: string;
} & CKInputProps;
export const FormInput = React.forwardRef(function FormInput(
  { isRequired, label, helperText, errorMessage, ...inputProps }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <FormControl isRequired={isRequired} isInvalid={errorMessage !== undefined}>
      <FormLabel htmlFor={label}>{label}</FormLabel>
      <CKInput {...inputProps} ref={ref} />
      <FormHelperText>{helperText}</FormHelperText>
      <FormErrorMessage role="error">{errorMessage}</FormErrorMessage>
    </FormControl>
  );
});
