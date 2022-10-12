import {
  FormControl,
  FormLabel,
  Input as CKInput,
  InputProps as CKInputProps,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";

type InputProps = {
  isRequired?: boolean;
  label: string;
  helperText?: string;
  errorMessage?: string;
} & CKInputProps;
export function Input({ isRequired, label, helperText, errorMessage, ...inputProps }: InputProps) {
  return (
    <FormControl isRequired={isRequired} isInvalid={errorMessage !== undefined}>
      <FormLabel>{label}</FormLabel>
      <CKInput {...inputProps} />
      <FormHelperText>{helperText}</FormHelperText>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
}
