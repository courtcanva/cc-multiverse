import React from "react";
import SignUpForm from "./SignUpForm";
import { VStack, Stack, Tab, Tabs, TabList, TabPanels, Text } from "@cc/ui-chakra";
import Logo from "@src/components/Logo";

const SignUp = () => {
  return (
    <VStack height="calc(100vh - 30px)" justifyContent="center">
      <Logo />
      <Stack width="500px">
        <SignUpForm />
      </Stack>
    </VStack>
  );
};

export default SignUp;
