import React from "react";
import SignUpForm from "./SignUpForm";
import { VStack, Text } from "@cc/ui-chakra";
import Logo from "@src/components/Logo";

const SignUp = () => {
  const formTitles: string[] = [
    "Register with CourtCanva as our franchisee",
    "Please Fill in your company information details",
    "Please fill in your personal information",
  ];
  const stepPannelTitles: string[] = ["Step 1", "Step 2", "Step 3"];
  const [formStep, setFormStep] = React.useState(0);

  return (
    <VStack
      alignItems="stretch"
      paddingTop="10vh"
      marginX={["16px", "200px"]}
      width="clamp(62.5%, 752px, 100%)"
      maxWidth="752px"
    >
      <Logo />
      <Text marginTop="24px" fontSize="16px" fontWeight="400" textAlign="center">
        {formTitles[formStep]}
      </Text>
      <SignUpForm formStep={formStep} setFormStep={setFormStep} />
    </VStack>
  );
};

export default SignUp;
