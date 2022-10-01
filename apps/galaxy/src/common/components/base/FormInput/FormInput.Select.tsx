import React from "react";

import { Select } from "@cc/ui-chakra";
import { Control, useController } from "react-hook-form";

type FormSelectInputProps = {
  control: Control<any, any>;
} & SelectFormInput;
export function FormSelectInput({ name, control, ...inputProps }: FormSelectInputProps) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name, control });

  return <Select value={value} onChange={onChange} errorMessage={error?.message} {...inputProps} />;
}
