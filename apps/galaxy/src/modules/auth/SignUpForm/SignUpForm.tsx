import React from "react";
import { useSignUpForm } from "./useSignUpForm";

import { Form, Tab, TabList, TabPanels, Tabs } from "@cc/ui-chakra";
import { SignUpFormStepPanel } from "./SignUpForm.StepPanel";

export function SignUpForm() {
  const { steps, currentStep, control, onSubmit } = useSignUpForm();

  return (
    <Form onSubmit={onSubmit}>
      <Tabs index={currentStep}>
        <TabList>
          {steps.map((_step, index) => (
            <Tab key={index} isDisabled={index > currentStep ? true : false}>{`Step ${
              index + 1
            }`}</Tab>
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
  );
}
