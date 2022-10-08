import { ComponentMeta } from "@storybook/react";

import { HStack } from "@chakra-ui/react";
import { Input } from "./Input";

const onClick = () => {
  console.debug("Beep");
};

export default {
  title: "Form / Input",
  component: Input,
} as ComponentMeta<typeof Input>;

export function Default() {
  return <Input onClick={onClick}>Input</Input>;
}

export function Variants() {
  return (
    <HStack>
      <Input onClick={onClick}>Primary Input</Input>
      <Input variant="secondary" onClick={onClick}>
        Secondary Input
      </Input>
    </HStack>
  );
}
