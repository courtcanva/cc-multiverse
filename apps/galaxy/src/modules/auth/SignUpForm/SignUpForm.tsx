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
  const { register, getFieldState, getValues, formState, handleSubmit } = useForm<FormData>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(SignUpFormInfoSchema),
  });
  const fieldState = getFieldState("username").error;
  const onSubmit = handleSubmit((data) => handleSignUpSubmit(data));
  React.useEffect(() => {
    console.log(fieldState);
    console.log("invalid", formState.isValid);
  }, [formState]);
  return (
    <FormControl as="form" onSubmit={onSubmit}>
      {props.formStep === 0 && (
        <section>
          <VStack align="start" alignItems="stretch" spacing="24px">
            <Stack>
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
            </Stack>
          </VStack>
        </section>
      )}
      {props.formStep === 1 && (
        <section>
          <VStack align="start" alignItems="stretch" spacing="24px">
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
            <FormInput {...abn} {...register("abn")} errorMessage={formState.errors.abn?.message} />
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
          </VStack>
        </section>
      )}
      {props.formStep === 2 && (
        <section>
          <VStack align="start" alignItems="stretch" spacing="24px">
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
          </VStack>
        </section>
      )}
      {renderButton()}
    </FormControl>
  );
};

export default SignUpForm;
