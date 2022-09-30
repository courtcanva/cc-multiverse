import React from "react";

import { Select, SelectOption } from "@cc/ui-chakra";
import { Control, useController } from "react-hook-form";

type FormSelectInputProps = {
  label: string;
  placeholder: string;
  name: string;
  control: Control<any, any>;
  options: SelectOption[];
};
export function FormSelectInput({
  label,
  placeholder,
  name,
  control,
  options,
}: FormSelectInputProps) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  return (
    <Select
      value={value}
      onChange={onChange}
      label={label}
      placeholder={placeholder}
      options={options}
      errorMessage={error?.message}
    />
  );
}
