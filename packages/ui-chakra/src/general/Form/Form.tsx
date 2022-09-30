import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import React from "react";

type FormProps = {
  onSubmit: () => void;
  errorMessage?: string;
  children: React.ReactNode;
};
export function Form({ onSubmit, errorMessage, children }: FormProps) {
  return (
    <FormControl as="form" onSubmit={onSubmit} isInvalid={errorMessage !== undefined}>
      {children}
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
}
