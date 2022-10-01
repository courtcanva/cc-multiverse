import React from "react";
import NotFoundIcon from "../../assets/icons/404.svg";

export type IconVariants = "not-found";

type IconProps = {
  variant: IconVariants;
};
export function Icon({ variant }: IconProps) {
  const icons = {
    ["not-found"]: <NotFoundIcon />,
  };

  return icons[variant];
}
