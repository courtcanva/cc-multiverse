import { Wrap, WrapItem } from "@chakra-ui/react";
import { ComponentMeta } from "@storybook/react";

import { Icon, IconVariants, iconVariants } from "./Icon";

export default {
  title: "Base / Icon",
  component: Icon,
} as ComponentMeta<typeof Icon>;

export function Default() {
  return (
    <Wrap>
      {Object.keys(iconVariants).map((variant) => (
        <WrapItem key={variant}>
          <Icon variant={variant as IconVariants} />
        </WrapItem>
      ))}
    </Wrap>
  );
}
