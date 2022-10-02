type BaseFormInput<FormValueType> = {
  name: NestedKeyOf<FormValueType>;
  label: string;
  placeholder: string;
};

type TextFormInput<FormValueType = object> = {
  type?: "text" | "password";
} & BaseFormInput<FormValueType>;

type SelectFormInput<FormValueType = object> = {
  type?: "select";
  options: { value: string; label: string }[];
} & BaseFormInput<FormValueType>;

type FormInputField<FormValueType> = TextFormInput<FormValueType> | SelectFormInput<FormValueType>;
