import React from "react";
import { Control } from "react-hook-form";

import { TabPanel, Flex } from "@cc/ui-chakra";
import { FormSelectInput, FormTextInput } from "@src/components";

type SignUpFormStepPanelProps = {
  control: Control<SignUpFormValues>;
} & SignUpFormStep;

export function SignUpFormStepPanel({
  fields,
  control,
  disableBackButton,
  isLastStep,
  onBack,
  onNext,
}: SignUpFormStepPanelProps) {
  return (
    <TabPanel padding="0px 0px">
      <Flex direction="column" gap="16px">
        {fields.map(({ type = "text", ...field }) => {
          const inputTypes = {
            text: <FormTextInput type="text" key={field.name} control={control} {...field} />,
            password: (
              <FormTextInput type="password" key={field.name} control={control} {...field} />
            ),
            select: (
              <FormSelectInput
                key={field.name}
                control={control}
                options={(field as SelectFormInput<SignUpFormValues>).options}
                {...field}
              />
            ),
          };
          return inputTypes[type];
        })}
      </Flex>
    </TabPanel>
  );
}
