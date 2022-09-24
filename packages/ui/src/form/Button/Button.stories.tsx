import { HStack } from "@chakra-ui/react";
import { Button } from "./Button";

const onClick = () => {};

export default {
  title: "Form / Button",
  component: Button,
};

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
      <Button variant="tertiary" onClick={onClick}>
        Tertiary Button
      </Button>
      <Button variant="accent" onClick={onClick}>
        Accent Button
      </Button>
      <Button variant="error" onClick={onClick}>
        Error Button
      </Button>
    </HStack>
  );
}
