import React from "react";
import { AxiosError } from "axios";
import { useSignUpForm } from "./useSignUpForm";

import { Form, Tab, TabList, TabPanels, Tabs } from "@cc/ui-chakra";
import { SignUpFormStepPanel } from "./SignUpForm.StepPanel";

type SignUpFormProps = {
  onSubmit: (values: SignUpFormValues) => void;
  error?: AxiosError;
};
export function SignUpForm({ onSubmit, error }: SignUpFormProps) {
  const { formFields, checkIfEmailExist, control, handleSubmit } = useSignUpForm();

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Tabs>
        <TabList>
          {formFields.map((step, index) => (
            <Tab key={index} disabled={false}>{`Step ${index + 1}`}</Tab>
          ))}
        </TabList>

        <TabPanels>
          {formFields.map((stepFields, index) => (
            <SignUpFormStepPanel
              key={index}
              disableBackButton={index === 0}
              isLastStep={index === 2}
              onBack={() => {
                console.log("going back");
              }}
              onNext={
                index === 0
                  ? checkIfEmailExist
                  : () => {
                      console.log("going forward");
                    }
              }
              fields={stepFields}
              control={control}
            />
          ))}
        </TabPanels>
      </Tabs>
    </Form>
  );
}
