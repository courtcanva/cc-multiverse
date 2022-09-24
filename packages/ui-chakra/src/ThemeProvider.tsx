import React from "react";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Dict } from "@chakra-ui/utils";

type ThemeProviderProps = {
  theme: Dict;
  children: React.ReactNode;
};
export function ThemeProvider({ children, theme }: ThemeProviderProps) {
  return <ChakraProvider theme={extendTheme(theme)}>{children}</ChakraProvider>;
}
