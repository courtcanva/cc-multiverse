import React from "react";
import { Button as CKButton } from "@chakra-ui/react";

type ButtonVariant = "primary" | "secondary";
type ButtonProps = {
  flex?: number;
  variant?: ButtonVariant;
  width?: string;
  marginTop?: string;
  isLoading?: boolean;
  flex?: number;
};
export const Button = ({
  variant = "primary",
  children,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const buttonVariants = {
    primary: {
      bg: "#36495D",
      _hover: {
        background: "#36495D",
        opacity: "0.82",
      },
      _active: {
        background: "#36495D",
      },
    },
    secondary: {
      bg: "#49B785",
      _hover: {
        background: "#49B785",
        opacity: "0.82",
      },
      _active: {
        background: "#49B785",
      },
    },
  };

  return (
    <CKButton {...props} color="#FFFFFF" {...buttonVariants[variant]}>
      {children}
    </CKButton>
  );
};
