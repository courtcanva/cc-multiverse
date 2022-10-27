import React from "react";
import { Button, FormControl, Stack, VStack, Flex, FormSelect, FormInput } from "@cc/ui-chakra";
import { StateEnum } from "@src/constants";
import RegisterInfoPage from "./SignUpForm.RegisterInfoPage";
import CompanyInfoPage from "./SignUpForm.CompanyInfo";
import StaffInfoPage from "./SignUpForm.StaffInfoPage";

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
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  formStep: number;
}) => {
  const { formStep, setFormStep } = props;
  const goNextFromStep = () => {
    formStep !== 0 && setFormStep(formStep + 1);
  };
  const goBackFromStep = () => {
    setFormStep(formStep - 1);
  };
  const renderButton = () => {
    return (
      <Flex direction="column" gap="16px">
        <Stack marginTop="24px" direction={["column", "row"]} justifyContent="stretch">
          {formStep !== 0 && (
            <Button flex={1} onClick={goBackFromStep}>
              Back
            </Button>
          )}
          {formStep === 2 ? (
            <Button type="submit" flex={1} variant="secondary" disabled={false}>
              Submit
            </Button>
          ) : formStep === 0 ? (
            <Button flex={1} onClick={goNextFromStep} variant="secondary" disabled={false}>
              Next
            </Button>
          ) : (
            <Button flex={1} onClick={goNextFromStep} variant="secondary" disabled={false}>
              Next
            </Button>
          )}
        </Stack>
      </Flex>
    );
  };
  // const stepOneVaild =
  //   getFieldState("username").invalid ||
  //   !getFieldState("username").isTouched ||
  //   getFieldState("password").invalid ||
  //   getFieldState("confirmPassword").invalid;
  // const stepTwoVaild =
  //   getFieldState("businessName").invalid ||
  //   !getFieldState("businessName").isTouched ||
  //   getFieldState("legalEntityName").invalid ||
  //   getFieldState("abn").invalid ||
  //   getFieldState("contactNumber").invalid ||
  //   getFieldState("companyState").invalid ||
  //   getFieldState("companyPostcode").invalid ||
  //   getFieldState("businessAddress").invalid;
  // const stepThreeVaild =
  //   getFieldState("firstName").invalid ||
  //   !getFieldState("firstName").isTouched ||
  //   getFieldState("lastName").invalid ||
  //   getFieldState("phoneNumber").invalid ||
  //   getFieldState("residentialState").invalid ||
  //   getFieldState("residentialPostcode").invalid ||
  //   getFieldState("residentialAddress").invalid;
  return (
    <FormControl as="form">
      <VStack align="start" alignItems="stretch" spacing="24px">
        {formStep === 0 && <RegisterInfoPage />}
        {formStep === 1 && <CompanyInfoPage />}
        {formStep === 2 && <StaffInfoPage />}
      </VStack>
      {renderButton()}
    </FormControl>
  );
};

export default SignUpForm;
