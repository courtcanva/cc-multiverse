import React from "react";

import { Input } from "@cc/ui-chakra";
import { Control, useController } from "react-hook-form";

type FormTextInputProps = {
  type?: React.HTMLInputTypeAttribute;
  label: string;
  placeholder: string;
  name: string;
  control: Control<any, any>;
};
export function FormTextInput({
  type = "text",
  label,
  placeholder,
  name,
  control,
}: FormTextInputProps) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <Input
      type={type}
      label={label}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      errorMessage={error?.message}
    />
  );
}
