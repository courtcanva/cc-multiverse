import React from "react";

import NotFoundIcon from "@/assets/icons/404.svg";

export type IconVariants = "not-found";

type IconProps = {
  variant: IconVariants;
};
export function Icon({ variant }: IconProps) {
  const icons = {
    ["not-found"]: (
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="#2C3333"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M40 0C17.9032 0 0 17.9032 0 40C0 62.0968 17.9032 80 40 80C62.0968 80 80 62.0968 80 40C80 17.9032 62.0968 0 40 0ZM40 72.2581C22.2097 72.2581 7.74194 57.7903 7.74194 40C7.74194 22.2097 22.2097 7.74194 40 7.74194C57.7903 7.74194 72.2581 22.2097 72.2581 40C72.2581 57.7903 57.7903 72.2581 40 72.2581ZM27.0968 37.4194C29.9516 37.4194 32.2581 35.1129 32.2581 32.2581C32.2581 29.4032 29.9516 27.0968 27.0968 27.0968C24.2419 27.0968 21.9355 29.4032 21.9355 32.2581C21.9355 35.1129 24.2419 37.4194 27.0968 37.4194ZM52.9032 27.0968C50.0484 27.0968 47.7419 29.4032 47.7419 32.2581C47.7419 35.1129 50.0484 37.4194 52.9032 37.4194C55.7581 37.4194 58.0645 35.1129 58.0645 32.2581C58.0645 29.4032 55.7581 27.0968 52.9032 27.0968ZM40 47.7419C33.5161 47.7419 27.4194 50.5968 23.2581 55.5806C21.8871 57.2258 22.1129 59.6613 23.7581 61.0323C25.4032 62.3871 27.8387 62.1774 29.2097 60.5323C31.8871 57.3226 35.8226 55.4677 40 55.4677C44.1774 55.4677 48.1129 57.3064 50.7903 60.5323C52.0968 62.0968 54.5161 62.4516 56.2419 61.0323C57.8871 59.6613 58.0968 57.2258 56.7419 55.5806C52.5806 50.5968 46.4839 47.7419 40 47.7419Z"
          fillOpacity="0.8"
        />
      </svg>
    ),
  };

  return icons[variant];
}
