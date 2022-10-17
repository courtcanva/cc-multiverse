import React from "react";
import { useForm } from "react-hook-form";
import useSignIn from "@src/services/signin/useSignIn";
import { Button, FormLabel, FormControl, Input, Stack, VStack } from "@cc/ui-chakra";
import { formConfig } from "./formConfig";
import { StateEnum } from "@src/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpFormInfoSchema } from "./SignUpFrom.schema";
// import { SignUpFormStepPanel } from "./SignUpForm.StepPanel";

interface FormData {
  username: "string";
  password: "string";
  confirmPassword: "string";
  businessName: "string";
  legalEntityName: "string";
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
  const { handleSignInSubmit } = useSignIn();
  const {
    email,
    password,
    confirmPassword,
    businessName,
    legalEntityName,
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
  const [formStep, setFormStep] = React.useState(2);
  const { control, register, watch, handleSubmit } = useForm<FormData>({
    mode: "onBlur",
    resolver: yupResolver(SignUpFormInfoSchema),
  });
  const onSubmit = handleSubmit((data) => console.log(data));
  return (
    <FormControl as="form" onSubmit={onSubmit}>
      {formStep === 0 && (
        <section>
          <VStack align="start" alignItems="stretch" spacing="24px">
            <Stack>
              <FormLabel fontWeight="600">Email</FormLabel>
              <Input {...email} {...register("username")} isRequired={true} />
            </Stack>
            <Stack>
              <FormLabel fontWeight="600">Password</FormLabel>
              <Input {...password} {...register("password")} isRequired={true} />
            </Stack>
            <Stack>
              <FormLabel fontWeight="600">Confirm Password</FormLabel>
              <Input {...confirmPassword} {...register("password")} isRequired={true} />
            </Stack>
          </VStack>
          <Stack marginTop="48px">
            <Button role="signIn" variant="secondary" type="submit">
              Next
            </Button>
          </Stack>
        </section>
      )}
      {formStep === 1 && (
        <section>
          <VStack align="start" alignItems="stretch" spacing="24px">
            <Stack>
              <FormLabel fontWeight="600">Business Name</FormLabel>
              <Input {...businessName} {...register("businessName")} isRequired={true} />
            </Stack>
            <Stack>
              <FormLabel fontWeight="600">Legal Name</FormLabel>
              <Input {...legalEntityName} {...register("legalEntityName")} isRequired={true} />
            </Stack>
            <Stack>
              <FormLabel fontWeight="600">ABN</FormLabel>
              <Input {...abn} {...register("abn")} isRequired={true} />
            </Stack>
            <Stack>
              <FormLabel fontWeight="600">Contact Number</FormLabel>
              <Input {...contactNumber} {...register("contactNumber")} isRequired={true} />
            </Stack>
            <Stack>
              <FormLabel fontWeight="600">State (AU only)</FormLabel>
              <Input {...companyState} {...register("companyState")} isRequired={true} />
            </Stack>
            <Stack>
              <FormLabel fontWeight="600">Postcode</FormLabel>
              <Input {...companyPostcode} {...register("companyPostcode")} isRequired={true} />
            </Stack>
            <Stack>
              <FormLabel fontWeight="600">Company Address Details</FormLabel>
              <Input {...businessAddress} {...register("businessAddress")} isRequired={true} />
            </Stack>
          </VStack>
          <Stack marginTop="48px">
            <Button role="signIn" variant="secondary" type="submit">
              Back
            </Button>
            <Button role="signIn" variant="secondary" type="submit">
              Next
            </Button>
          </Stack>
        </section>
      )}
      {formStep === 2 && (
        <section>
          <VStack align="start" alignItems="stretch" spacing="24px">
            <Stack>
              <FormLabel fontWeight="600">First Name</FormLabel>
              <Input {...firstName} {...register("firstName")} isRequired={true} />
            </Stack>
            <Stack>
              <FormLabel fontWeight="600">Last Name</FormLabel>
              <Input {...lastName} {...register("lastName")} isRequired={true} />
            </Stack>
            <Stack>
              <FormLabel fontWeight="600">Phone Number</FormLabel>
              <Input {...phoneNumber} {...register("phoneNumber")} isRequired={true} />
            </Stack>
            <Stack>
              <FormLabel fontWeight="600">State (AU only)</FormLabel>
              <Input {...residentialState} {...register("residentialState")} isRequired={true} />
            </Stack>
            <Stack>
              <FormLabel fontWeight="600">Postcode</FormLabel>
              <Input
                {...residentialPostcode}
                {...register("residentialPostcode")}
                isRequired={true}
              />
            </Stack>
            <Stack>
              <FormLabel fontWeight="600">Residential Address</FormLabel>
              <Input
                {...residentialAddress}
                {...register("residentialAddress")}
                isRequired={true}
              />
            </Stack>
          </VStack>
          <Stack marginTop="48px">
            <Button role="signIn" variant="secondary" type="submit">
              Back
            </Button>
            <Button role="signIn" variant="secondary" type="submit">
              Submit
            </Button>
          </Stack>
        </section>
      )}
    </FormControl>
  );
};

export default SignUpForm;
