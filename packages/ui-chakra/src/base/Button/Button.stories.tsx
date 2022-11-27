import { ComponentMeta, ComponentStory } from "@storybook/react";

import { HStack } from "@chakra-ui/react";
import { Button } from "./Button";

const onClick = () => {
  console.debug("Beep");
};

export default {
  title: "Form / Button",
  component: Button,
  argTypes: {
    variant: {
      options: ["primary", "secondary"],
      control: { type: "radio" },
    },
    children: {
      defaultValue: "Button",
      control: { type: "text" },
    },
  },
} as ComponentMeta<typeof Button>;

export function Controllable(args: ComponentStory<typeof Button>) {
  return <Button {...args} />;
}

export function Default() {
  return <Button onClick={onClick}>Button</Button>;
}

export function Variants() {
  return (
    <HStack>
      <Button onClick={onClick}>Primary Button</Button>
      <Button variant="secondary" onClick={onClick}>
        Secondary Button
      </Button>
    </HStack>
  );
}
