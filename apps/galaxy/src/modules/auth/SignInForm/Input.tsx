import React from "react";

import { Input as CKInput } from "@chakra-ui/react";

type InputVariant = "primary";
type InputProps = {
  variant?: InputVariant;
  width?: string;
};
export const Input = ({
  variant = "primary",
  ...props
}: InputProps & React.InputHTMLAttributes<HTMLInputElement>) => {
  const InputVariants = {
    primary: {
      size: "md",
    },
    secondary: {
      size: "sm",
    },
  };

  return <CKInput {...props} {...InputVariants[variant]} />;
};
