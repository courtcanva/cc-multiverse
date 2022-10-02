import React from "react";

import { Button as CKButton } from "@chakra-ui/react";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "accent" | "error";
type ButtonProps = {
  flex?: number;
  variant?: ButtonVariant;
};
export const Button = ({
  variant = "primary",
  children,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const buttonVariants = {
    primary: {
      bg: "#36495D",
    },
    secondary: {
      bg: "#49B785",
    },
    tertiary: {
      bg: "#6F4E93",
    },
    accent: {
      bg: "#6B8F40",
    },
    error: {
      bg: "#972A3A",
    },
  };

  return (
    <CKButton {...props} color="#FFFFFF" {...buttonVariants[variant]}>
      {children}
    </CKButton>
  );
};
