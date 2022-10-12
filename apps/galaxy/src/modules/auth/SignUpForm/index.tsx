import React from "react";
import { useSignUpForm } from "../../../services/signup/useSignUp";

import { Form, Tab, TabList, TabPanels, Tabs, Flex, Image, Text } from "@cc/ui-chakra";
import { SignUpFormStepPanel } from "./SignUpForm.StepPanel";

export function SignUp() {
  const { steps, currentStep, control, onSubmit } = useSignUpForm();
  const formTitles: string[] = [
    "Register with CourtCanva as our franchisee",
    "Please Fill in your company information details",
    "Please fill in your personal information",
  ];
  return (
    <Flex width="100vw" justifyContent="center" alignItems="center">
      <Flex
        width="427px"
        margin="102px 0px"
        flexDir="column"
        justifyContent="center"
        alignItems="center"
      >
        <Image
          boxSize="100px"
          alt="dashboard-logo-192x192"
          src="/assets/dashboard-logo-192x192.png"
        />
        <Text fontSize="24px" margin="24px 0px">
          CourtCanva
        </Text>
        <Text marginBottom="24px" fontSize="16px" fontWeight="400">
          {formTitles[currentStep]}
        </Text>

        <Form onSubmit={onSubmit}>
          <Tabs isFitted align="center" index={currentStep}>
            <TabList border="hidden" margin="10.5px 5px 30.5px 5px">
              {steps.map((_step, index) => (
                <Tab
                  _selected={{ borderColor: "#49B785", color: "#2B6CB0" }}
                  borderColor="rgba(54, 73, 93, 0.43)"
                  color="rgba(43, 108, 176, 0.7)"
                  margin="0px 5px"
                  key={index}
                  isDisabled={index > currentStep ? true : false}
                >{`Step ${index + 1}`}</Tab>
              ))}
            </TabList>
            <TabPanels>
              {steps.map((step, index) => (
                <SignUpFormStepPanel
                  key={index}
                  disableBackButton={index === 0}
                  isLastStep={index === 2}
                  onBack={step.onBack}
                  onNext={step.onNext}
                  fields={step.fields}
                  control={control}
                />
              ))}
            </TabPanels>
          </Tabs>
        </Form>
      </Flex>
    </Flex>
  );
}
