import React from "react";

import { Input } from "@cc/ui-chakra";
import { Control, useController } from "react-hook-form";

type FormTextInputProps = {
  control: Control<any, any>;
} & TextFormInput;
export function FormTextInput({ name, control, type = "text", ...inputProps }: FormTextInputProps) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <Input
      value={value}
      onChange={onChange}
      errorMessage={error?.message}
      type={type}
      {...inputProps}
    />
  );
}
