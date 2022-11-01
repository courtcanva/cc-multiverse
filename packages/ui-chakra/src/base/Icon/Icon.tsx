import React from "react";
import { Icon as CKIcon, Spinner } from "@chakra-ui/react";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";

export const iconVariants = {
  loading: Spinner,
  check: BsCheckCircle,
  cross: BsXCircle,
};

export type IconVariants = keyof typeof iconVariants;
export type IconProps = {
  boxSize?: "16px" | "32px" | "64px" | string;
  color?: string;
  variant: IconVariants;
};
export function Icon({ boxSize = "16px", color, variant }: IconProps) {
  return <CKIcon as={iconVariants[variant]} boxSize={boxSize} color={color} />;
}
