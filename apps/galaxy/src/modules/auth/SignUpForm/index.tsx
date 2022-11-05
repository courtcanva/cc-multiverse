import React, { useState } from "react";
import { VStack, Text, StepTab, Button } from "@cc/ui-chakra";
import Logo from "@src/components/Logo";
import RegisterInfoPage from "./RegisterInfoPage";
import CompanyInfoPage from "./CompanyInfoPage";
import StaffInfoPage from "./StaffInfoPage";
import { useRouter } from "next/router";

const SignUp = () => {
  const [formStep, setFormStep] = useState(0);
  const [data, setData] = useState<SignUpFormData>({
    username: null,
    password: null,
    confirmPassword: null,
    businessName: null,
    legalEntityName: null,
    abn: null,
    contactNumber: null,
    businessAddress: null,
    companyPostcode: null,
    companyState: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,
    residentialAddress: null,
    residentialPostcode: null,
    residentialState: null,
  });
  const router = useRouter();
  const pushToSignIn = () => {
    router.push("/sign-in");
  };
  const formTitles = [
    "Register with CourtCanva as our franchisee",
    "Please Fill in your company information details",
    "Please fill in your personal information",
  ];

  return (
    <VStack alignItems="stretch" paddingTop="10vh" width="480px" maxWidth="752px">
      <Logo />
      <Text marginTop="24px" fontSize="16px" fontWeight="400" textAlign="center">
        {formTitles[formStep]}
      </Text>
      <StepTab formStep={formStep} setFormStep={setFormStep} />
      <VStack align="start" alignItems="stretch" spacing="24px">
        {formStep === 0 && (
          <RegisterInfoPage
            formStep={formStep}
            setFormStep={setFormStep}
            data={data}
            setData={setData}
          />
        )}
        {formStep === 1 && (
          <CompanyInfoPage
            formStep={formStep}
            setFormStep={setFormStep}
            data={data}
            setData={setData}
          />
        )}
        {formStep === 2 && <StaffInfoPage data={data} setData={setData} />}
        <Button onClick={pushToSignIn} variant="hyperlink">
          Already have an account? Login here.
        </Button>
      </VStack>
    </VStack>
  );
};

export default SignUp;
