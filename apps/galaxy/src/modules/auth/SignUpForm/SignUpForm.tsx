import React from "react";
import { useForm } from "react-hook-form";
import useSignUp from "@src/services/signup/useSignUp";
import { Button, FormLabel, FormControl, Input, Stack, VStack, Select, Flex } from "@cc/ui-chakra";
import { formConfig } from "./formConfig";
import { StateEnum } from "@src/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpFormInfoSchema } from "./SignUpFrom.schema";
import { FormErrorMessage } from "@chakra-ui/react";

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

const SignUpForm = (props) => {
  const { handleSignUpSubmit, checkEmailRequest, isEmailExists } = useSignUp();
  const goNextFromStep = () => {
    // if (formStep == 0) {
    //   checkEmailRequest(getValues("username"));
    //   if (!isEmailExists) {
    //     setFormStep((cur) => cur + 1);
    //   }
    // } else {
    props.setFormStep((cur: number) => cur + 1);
  };
  // };
  const goBackFromStep = () => {
    props.setFormStep((cur: number) => cur - 1);
  };
  const renderButton = () => {
    return (
      <Flex direction="column" gap="16px">
        <Stack marginTop="24px" direction="row" justifyContent="stretch">
          {props.formStep != 0 && (
            <Button flex={1} onClick={goBackFromStep}>
              Back
            </Button>
          )}
          {props.formStep == 2 ? (
            <Button type="submit" flex={1} variant="secondary">
              Submit
            </Button>
          ) : (
            <Button flex={1} onClick={goNextFromStep} variant="secondary">
              Next
            </Button>
          )}
        </Stack>
      </Flex>
    );
  };
  const {
    username,
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
  const { control, register, watch, formState, handleSubmit } = useForm<FormData>({
    mode: "onBlur",
    resolver: yupResolver(SignUpFormInfoSchema),
  });
  const onSubmit = handleSubmit((data) => console.log(data));
  React.useEffect(() => {
    console.log("touchedFields", formState.touchedFields);
  }, [formState]);
  return (
    <FormControl as="form" onSubmit={onSubmit}>
      {props.formStep === 0 && (
        <section>
          <VStack align="start" alignItems="stretch" spacing="24px">
            <Stack>
              <FormControl isInvalid={true}>
                <FormLabel fontWeight="600">Email</FormLabel>
                <Input {...username} {...register("username")} />
                <FormErrorMessage>{formState.errors.username?.message}</FormErrorMessage>
              </FormControl>
            </Stack>
            <Stack>
              <FormLabel fontWeight="600">Password</FormLabel>
              <Input {...password} {...register("password")} />
            </Stack>
            <Stack>
              <FormLabel fontWeight="600">Confirm Password</FormLabel>
              <Input {...confirmPassword} {...register("password")} />
            </Stack>
          </VStack>
        </section>
      )}
      {props.formStep === 1 && (
        <section>
          <VStack align="start" alignItems="stretch" spacing="24px">
            <Stack>
              <FormLabel fontWeight="600">Business Name</FormLabel>
              <Input {...businessName} {...register("businessName")} />
            </Stack>
            <Stack>
              <FormLabel fontWeight="600">Legal Name</FormLabel>
              <Input {...legalEntityName} {...register("legalEntityName")} />
            </Stack>
            <Stack>
              <FormLabel fontWeight="600">ABN</FormLabel>
              <Input {...abn} {...register("abn")} />
            </Stack>
            <Stack>
              <FormLabel fontWeight="600">Contact Number</FormLabel>
              <Input {...contactNumber} {...register("contactNumber")} />
            </Stack>
            <Stack>
              <FormLabel fontWeight="600">State (AU only)</FormLabel>
              <Select
                {...register("companyState")}
                variant="outline"
                placeholder="Please select a state"
              >
                {formConfig.selectOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Stack>
            <Stack>
              <FormLabel fontWeight="600">Postcode</FormLabel>
              <Input {...companyPostcode} {...register("companyPostcode")} />
            </Stack>
            <Stack>
              <FormLabel fontWeight="600">Company Address Details</FormLabel>
              <Input {...businessAddress} {...register("businessAddress")} />
            </Stack>
          </VStack>
        </section>
      )}
      {props.formStep === 2 && (
        <section>
          <VStack align="start" alignItems="stretch" spacing="24px">
            <Stack>
              <FormLabel fontWeight="600">First Name</FormLabel>
              <Input {...firstName} {...register("firstName")} />
            </Stack>
            <Stack>
              <FormLabel fontWeight="600">Last Name</FormLabel>
              <Input {...lastName} {...register("lastName")} />
            </Stack>
            <Stack>
              <FormLabel fontWeight="600">Phone Number</FormLabel>
              <Input {...phoneNumber} {...register("phoneNumber")} />
            </Stack>
            <Stack>
              <FormLabel fontWeight="600">State (AU only)</FormLabel>
              <Select
                variant="outline"
                placeholder="Please select a state"
                {...register("residentialState")}
              >
                {formConfig.selectOptions.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Stack>
            <Stack>
              <FormLabel fontWeight="600">Postcode</FormLabel>
              <Input {...residentialPostcode} {...register("residentialPostcode")} />
            </Stack>
            <Stack>
              <FormLabel fontWeight="600">Residential Address</FormLabel>
              <Input {...residentialAddress} {...register("residentialAddress")} />
            </Stack>
          </VStack>
        </section>
      )}
      {renderButton()}
    </FormControl>
  );
};

export default SignUpForm;
