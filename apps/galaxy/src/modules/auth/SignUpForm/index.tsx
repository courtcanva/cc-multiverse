import React from "react";
import SignUpForm from "./SignUpForm";
import { VStack, Stack, Flex, Text, Tab, Tabs, TabList, TabPanels } from "@cc/ui-chakra";
import Logo from "@src/components/Logo";

const SignUp = () => {
  const formTitles: string[] = [
    "Register with CourtCanva as our franchisee",
    "Please Fill in your company information details",
    "Please fill in your personal information",
  ];
  const stepPannelTitles: string[] = ["Step 1", "Step 2", "Step 3"];
  const [formStep, setFormStep] = React.useState(1);

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
      <Tabs size="md" isFitted align="center" index={formStep}>
        <TabList border="hidden" margin="10.5px 5px 30.5px 5px">
          {stepPannelTitles.map((_step, index) => (
            <Tab
              _selected={{ borderColor: "#49B785", color: "#2B6CB0" }}
              borderColor="rgba(54, 73, 93, 0.43)"
              color="rgba(43, 108, 176, 0.7)"
              margin="0px 5px"
              key={index}
              isDisabled={index > formStep ? true : false}
              onClick={() => setFormStep(index)}
            >{`Step ${index + 1}`}</Tab>
          ))}
        </TabList>
        <TabPanels>{stepPannelTitles[formStep]}</TabPanels>
      </Tabs>

      <SignUpForm formStep={formStep} setFormStep={setFormStep} />
    </VStack>
  );
};

export default SignUp;
