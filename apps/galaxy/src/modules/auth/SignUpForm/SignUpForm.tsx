import React from "react";
import { useForm } from "react-hook-form";
// import useSignIn from "@src/services/signin/useSignIn";
import { Button, FormLabel, FormControl, Input, Stack, VStack } from "@cc/ui-chakra";
import { formConfig } from "./formConfig";
import { StateEnum } from "@src/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpFormInfoSchema } from "./SignUpFrom.schema";
import { SignUpFormStepPanel } from "./SignUpForm.StepPanel";

interface FormData {
  email: "string";
  password: "string";
  confirmPassword: "string";
  businessName: "string";
  legalName: "string";
  abn: "string";
  contactNumber: "string";
  businessAddress: "string";
  companyPostcode: "string";
  companyState: StateEnum;
  firstName: "string";
  lastName: "string";
  phoneNumber: "string";
  residentialAddress: "string";
  residentialPostcode: "string";
  residentialState: StateEnum;
}

const SignUpForm = () => {
  // const { isLoading, handleSignInSubmit } = useSignIn();
  const {
    email,
    password,
    confirmPassword,
    businessName,
    legalName,
    abn,
    contactNumber,
    businessAddress,
    companyPostcode,
    companyState,
    firstName,
    lastName,
    phoneNumber,
    residentialAddress,
    residentialPostcode,
    residentialState,
  } = formConfig;
  const { control, register, watch, handleSubmit } = useForm<FormData>({
    mode: "onBlur",
    resolver: yupResolver(SignUpFormInfoSchema),
  });
  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <FormControl as="form" onSubmit={onSubmit}>
      <section>
        <VStack align="start" alignItems="stretch" spacing="24px">
          <Stack>
            <FormLabel fontWeight="600">Email</FormLabel>
            <Input {...email} {...register("email")} isRequired={true} />
          </Stack>
          <Stack>
            <FormLabel fontWeight="600">Password</FormLabel>
            <Input {...password} {...register("password")} isRequired={true} />
          </Stack>
        </VStack>
        <Stack marginTop="48px">
          <Button role="signIn" variant="secondary" type="submit" isLoading={isLoading}>
            Next
          </Button>
        </Stack>
      </section>
    </FormControl>
  );
};

export default SignUpForm;
