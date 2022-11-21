import { FormControl, FormErrorMessage } from "@chakra-ui/react";
import React from "react";

type FormProps = {
  errorMessage?: string;
  children: React.ReactNode;
};
export function Form({ errorMessage, children }: FormProps) {
  return (
    <FormControl as="form" isInvalid={errorMessage !== undefined}>
      {children}
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
    </FormControl>
  );
}
