import React from "react";
import { useForm } from "react-hook-form";
import useSignUp from "@src/services/signup/useSignUp";
import { Button, FormControl, Stack, VStack, Flex, FormSelect, FormInput } from "@cc/ui-chakra";
import { formConfig } from "./formConfig";
import { StateEnum } from "@src/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpFormInfoSchema } from "./SignUpFrom.schema";

export interface FormData {
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

const SignUpForm = (props: {
  setFormStep: (arg0: { (cur: number): number; (cur: number): number }) => void;
  formStep: number;
}) => {
  const { handleSignUpSubmit, checkEmailRequest, isEmailExists } = useSignUp();
  const goNextFromStep = () => {
    props.formStep != 0 && props.setFormStep((cur: number) => cur + 1);
    if (props.formStep == 0) {
      // checkEmailRequest(getValues("username"));
      // if (!isEmailExists) {
      props.setFormStep((cur) => cur + 1);
      // }
    }
  };
  const goBackFromStep = () => {
    props.setFormStep((cur: number) => cur - 1);
  };
  const renderButton = () => {
    return (
      <Flex direction="column" gap="16px">
        <Stack marginTop="24px" direction={["column", "row"]} justifyContent="stretch">
          {props.formStep != 0 && (
            <Button flex={1} onClick={goBackFromStep}>
              Back
            </Button>
          )}
          {props.formStep == 2 ? (
            <Button type="submit" flex={1} variant="secondary" disabled={stepThreeVaild}>
              Submit
            </Button>
          ) : props.formStep == 0 ? (
            <Button flex={1} onClick={goNextFromStep} variant="secondary" disabled={stepOneVaild}>
              Next
            </Button>
          ) : (
            <Button flex={1} onClick={goNextFromStep} variant="secondary" disabled={stepTwoVaild}>
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
  const { register, formState, getFieldState, handleSubmit } = useForm<FormData>({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(SignUpFormInfoSchema),
  });
  const onSubmit = handleSubmit((data) => handleSignUpSubmit(data));
  const stepOneVaild =
    getFieldState("username").invalid ||
    !getFieldState("username").isTouched ||
    getFieldState("password").invalid ||
    getFieldState("confirmPassword").invalid;
  const stepTwoVaild =
    getFieldState("businessName").invalid ||
    !getFieldState("businessName").isTouched ||
    getFieldState("legalEntityName").invalid ||
    getFieldState("abn").invalid ||
    getFieldState("contactNumber").invalid ||
    getFieldState("companyState").invalid ||
    getFieldState("companyPostcode").invalid ||
    getFieldState("businessAddress").invalid;
  const stepThreeVaild =
    getFieldState("firstName").invalid ||
    !getFieldState("firstName").isTouched ||
    getFieldState("lastName").invalid ||
    getFieldState("phoneNumber").invalid ||
    getFieldState("residentialState").invalid ||
    getFieldState("residentialPostcode").invalid ||
    getFieldState("residentialAddress").invalid;
  return (
    <FormControl as="form" onSubmit={onSubmit}>
      <section>
        <VStack align="start" alignItems="stretch" spacing="24px">
          {props.formStep === 0 && (
            <>
              <FormInput
                {...username}
                {...register("username")}
                errorMessage={formState.errors.username?.message}
              />
              <FormInput
                {...password}
                {...register("password")}
                errorMessage={formState.errors.password?.message}
              />
              <FormInput
                {...confirmPassword}
                {...register("confirmPassword")}
                errorMessage={formState.errors.confirmPassword?.message}
              />
            </>
          )}
          {props.formStep === 1 && (
            <>
              <FormInput
                {...businessName}
                {...register("businessName")}
                errorMessage={formState.errors.businessName?.message}
              />
              <FormInput
                {...legalEntityName}
                {...register("legalEntityName")}
                errorMessage={formState.errors.legalEntityName?.message}
              />
              <FormInput
                {...abn}
                {...register("abn")}
                errorMessage={formState.errors.abn?.message}
              />
              <FormInput
                {...contactNumber}
                {...register("contactNumber")}
                errorMessage={formState.errors.contactNumber?.message}
              />
              <FormSelect
                {...companyState}
                {...register("companyState")}
                errorMessage={formState.errors.companyState?.message}
              />
              <FormInput
                {...companyPostcode}
                {...register("companyPostcode")}
                errorMessage={formState.errors.companyPostcode?.message}
              />
              <FormInput
                {...businessAddress}
                {...register("businessAddress")}
                errorMessage={formState.errors.businessAddress?.message}
              />
            </>
          )}
          {props.formStep === 2 && (
            <>
              <FormInput
                {...firstName}
                {...register("firstName")}
                errorMessage={formState.errors.firstName?.message}
              />
              <FormInput
                {...lastName}
                {...register("lastName")}
                errorMessage={formState.errors.lastName?.message}
              />
              <FormInput
                {...phoneNumber}
                {...register("phoneNumber")}
                errorMessage={formState.errors.phoneNumber?.message}
              />
              <FormSelect
                {...residentialState}
                {...register("residentialState")}
                errorMessage={formState.errors.residentialState?.message}
              />
              <FormInput
                {...residentialPostcode}
                {...register("residentialPostcode")}
                errorMessage={formState.errors.residentialPostcode?.message}
              />

              <FormInput
                {...residentialAddress}
                {...register("residentialAddress")}
                errorMessage={formState.errors.residentialAddress?.message}
              />
            </>
          )}
        </VStack>
      </section>
      {renderButton()}
    </FormControl>
  );
};

export default SignUpForm;
