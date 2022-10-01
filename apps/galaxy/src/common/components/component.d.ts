type BaseFormInput = {
  name: string;
  label: string;
  placeholder: string;
};

type TextFormInput = {
  type?: "text" | "password";
} & BaseFormInput;

type SelectFormInput = {
  type?: "select";
  options: { value: string; label: string }[];
} & BaseFormInput;
