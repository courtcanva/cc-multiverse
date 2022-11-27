import { ComponentMeta, ComponentStory } from "@storybook/react";
import { FormGroupInput } from "./FormGroupInput";

export default {
  title: "Form / FormGroupInput",
  component: FormGroupInput,
  args: {
    label: "Form Group Input",
    id: "input",
    placeholder: "Enter something here",
  },
} as ComponentMeta<typeof FormGroupInput>;

export function Controllable(args: ComponentStory<typeof FormGroupInput>) {
  return <FormGroupInput {...args} />;
}

export function Default() {
  return (
    <FormGroupInput
      label="Form Group Input"
      id="input"
      placeholder="Enter somethign here"
      addon="Left Addon"
    />
  );
}

export function Error() {
  return (
    <FormGroupInput
      label="Form Group Input"
      id="input"
      placeholder="Enter somethign here"
      addon="Left Addon"
      errorMessage="This is not right"
    />
  );
}
