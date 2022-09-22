import React from "react";

import { Button as CKButton } from "@chakra-ui/react";

type ButtonProps = {
  onClick: () => void;
  children: string;
};
export const Button = ({ onClick, children }: ButtonProps) => {
  return <CKButton onClick={onClick}>{children}</CKButton>;
};
