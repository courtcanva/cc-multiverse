import React from "react";

import { Input } from "@cc/ui-chakra";
import { Control, useController } from "react-hook-form";

type FormTextInputProps = {
  control: Control<any, any>;
} & TextFormInput<any>;
export function FormTextInput({ name, control, type = "text", ...inputProps }: FormTextInputProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <Input
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      errorMessage={error?.message}
      type={type}
      {...inputProps}
    />
  );
}
