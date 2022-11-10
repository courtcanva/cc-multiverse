import React, { useState } from "react";
import { Stack, VStack, Text, StepTab, Flex } from "@cc/ui-chakra";
import Logo from "@src/components/Logo";
import RegisterInfoPage from "./RegisterInfoPage";
import CompanyInfoPage from "./CompanyInfoPage";
import StaffInfoPage from "./StaffInfoPage";

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
  const formTitles = [
    "Register with CourtCanva as our franchisee",
    "Please Fill in your company information details",
    "Please fill in your personal information",
  ];

  return (
    <Flex mt="10vh" width="100%" justifyContent="center">
      <VStack
        marginX={{ base: "16px", sm: "16px", md: "200px" }}
        width={{ base: "100%", lg: "428px" }}
        mb="24px"
      >
        <Logo />
        <Text marginTop="24px" fontSize="16px" fontWeight="400" textAlign="center">
          {formTitles[formStep]}
        </Text>
        <Stack width={{ base: "80px", sm: "80px", md: "428px" }}>
          <StepTab formStep={formStep} setFormStep={setFormStep} />
        </Stack>
        <Stack width="100%">
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
        </Stack>
      </VStack>
    </Flex>
  );
};

export default SignUp;
