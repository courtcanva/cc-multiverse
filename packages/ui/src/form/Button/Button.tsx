import React from "react";

import { Button as CKButton } from "@chakra-ui/react";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "accent" | "error";
type ButtonProps = {
  variant?: ButtonVariant;
  onClick: () => void;
  children: string;
};
export const Button = ({ variant = "primary", onClick, children }: ButtonProps) => {
  const buttonVariants = {
    primary: {
      bg: "#6B8F40",
    },
    secondary: {
      bg: "#972A3A",
    },
    tertiary: {
      bg: "#36495D",
    },
    accent: {
      bg: "#49B785",
    },
    error: {
      bg: "#6F4E93",
    },
  };

  return (
    <CKButton onClick={onClick} color="#FFFFFF" {...buttonVariants[variant]}>
      {children}
    </CKButton>
  );
};
