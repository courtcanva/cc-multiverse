import { Button, Icon, IconProps, Text, VStack } from "@cc/ui-chakra";
import Logo from "@src/components/Logo";
import React from "react";

type EmailVerificationProps = {
  icon: IconProps;
  message: string;
  action?: () => void;
};
export default function EmailVerification({ icon, message, action }: EmailVerificationProps) {
  return (
    <VStack>
      <Logo />
      <Icon {...icon} boxSize="64px" />
      <Text fontSize="24px">{message}</Text>
      {action && <Button onClick={action}>Continue</Button>}
    </VStack>
  );
}
