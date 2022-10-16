import React from "react";
import { SignUpForm } from "./SignUpForm";
import { VStack, Stack, Tab, Tabs, TabList, TabPanels, Text } from "@cc/ui-chakra";
import Logo from "@src/components/Logo";
import { SignUpFormStepPanel } from "./SignUpForm.StepPanel";

const SignUp = () => {
  return (
    <VStack height="calc(100vh - 30px)" justifyContent="center">
      <Logo />
      <Text height="72px" fontSize="22" fontWeight="bold">
        Register with CourtCanva as our franchisee
      </Text>
      {/* <Text height="72px" fontSize="22" fontWeight="bold">
        Please Fill in your company information details
      </Text>
      <Text height="72px" fontSize="22" fontWeight="bold">
        Please fill in your personal information
      </Text> */}
      <Stack width="500px">
        <SignUpForm />
      </Stack>
    </VStack>
  );
};

export default SignUp;
