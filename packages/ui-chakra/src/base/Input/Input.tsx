import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { Input as CKInput } from "@chakra-ui/react";

export type InputSize = "medium" | "large";
export type InputType = "text" | "email";
type InputVariant = "primary" | "secondary";

export type InputProps = {
  variant?: InputVariant;
  type?: InputType;
  size?: InputSize;
  className?: string;
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "size">;

export const Input = ({
  variant = "primary",
  children,
  ...props
}: InputProps & React.InputHTMLAttributes<HTMLInputElement>) => {
  const inputVariants = {
    primary: {
      size: "md",
    },
    secondary: {
      size: "ms",
    },
  };

  return (
    <CKInput {...props} color="#FFFFFF" {...inputVariants[variant]}>
      {children}
    </CKInput>
  );
};
