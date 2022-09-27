import React from "react";

export enum ButtonVariant {
  Primary = "primary",
  Secondary = "secondary",
  Danger = "danger",
}

type ButtonProps = {
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick: () => void;
  children: string;
  variant?: ButtonVariant;
};
export function Button({
  isLoading,
  isDisabled,
  onClick,
  children,
  variant = ButtonVariant.Primary,
}: ButtonProps) {
  const baseStyle =
    "rounded-lg px-4 py-2 text-white text-lg transition-all duration-500 ease-in-out";
  const classVariants = {
    [ButtonVariant.Primary]: "bg-green-500 hover:bg-green-600 font-semibold",
    [ButtonVariant.Secondary]: "bg-blue-500 hover:bg-blue-600 font-medium",
    [ButtonVariant.Danger]: "bg-red-500 hover:bg-red-600 font-semibold",
  };

  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`${baseStyle} ${classVariants[variant]}`}
    >
      {children}
    </button>
  );
}
