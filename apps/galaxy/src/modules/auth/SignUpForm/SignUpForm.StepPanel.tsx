import React from "react";
import { Control } from "react-hook-form";

import { Button, SelectOption, Stack, TabPanel } from "@cc/ui-chakra";
import { FormSelectInput, FormTextInput } from "@src/common";

type SignUpFormStepPanelProps = {
  fields: SignUpFormField[];
  control: Control<any, any>;
  disableBackButton: boolean;
  isLastStep: boolean;
  onBack: () => void;
  onNext: () => void;
};
export function SignUpFormStepPanel({
  fields,
  control,
  disableBackButton,
  isLastStep,
  onBack,
  onNext,
}: SignUpFormStepPanelProps) {
  return (
    <TabPanel>
      {fields.map(({ type = "text", ...field }) => {
        const inputTypes = {
          text: <FormTextInput type="text" key={field.name} control={control} {...field} />,
          password: <FormTextInput type="password" key={field.name} control={control} {...field} />,
          select: (
            <FormSelectInput
              key={field.name}
              control={control}
              options={field.options as SelectOption[]}
              {...field}
            />
          ),
        };

        return inputTypes[type];
      })}

      <Stack direction="row" justifyContent="stretch">
        {!disableBackButton && (
          <Button flex={1} onClick={onBack}>
            Back
          </Button>
        )}
        {isLastStep ? (
          <Button type="submit" flex={1}>
            Submit
          </Button>
        ) : (
          <Button flex={1} onClick={onNext}>
            Next
          </Button>
        )}
      </Stack>
    </TabPanel>
  );
}
