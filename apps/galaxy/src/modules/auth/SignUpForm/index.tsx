import React from "react";
import SignUpForm from "./SignUpForm";
import { Flex, Text, Tab, Tabs, TabList, TabPanels } from "@cc/ui-chakra";
import Logo from "@src/components/Logo";

const SignUp: React.FC = () => {
  const formTitles: string[] = [
    "Register with CourtCanva as our franchisee",
    "Please Fill in your company information details",
    "Please fill in your personal information",
  ];
  const stepPannelTitles: string[] = ["Step 1", "Step 2", "Step 3"];
  const [formStep, setFormStep] = React.useState(0);

  return (
    <Flex width="100vw" justifyContent="center" alignItems="center">
      <Flex
        width="427px"
        margin="102px 0px"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <Logo />
        <Text marginBottom="24px" fontSize="16px" fontWeight="400">
          {formTitles[formStep]}
        </Text>
        <Tabs isFitted align="center" index={formStep}>
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
      </Flex>
    </Flex>
  );
};

export default SignUp;
