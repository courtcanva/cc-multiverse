import React from "react";
import { VStack, Text, FormControl } from "@cc/ui-chakra";
import Logo from "@src/components/Logo";
import RegisterInfoPage from "./RegisterInfoPage";
import CompanyInfoPage from "./CompanyInfo";
import StaffInfoPage from "./StaffInfoPage";

const SignUp = () => {
  const formTitles: string[] = [
    "Register with CourtCanva as our franchisee",
    "Please Fill in your company information details",
    "Please fill in your personal information",
  ];
  const [formStep, setFormStep] = React.useState(0);
  const [data, setData] = React.useState({
    // username: "",
    // password: "",
    // confirmPassword: "",
    // businessName: "",
    // legalEntityName: "",
    // abn: "",
    // contactNumber: "",
    // businessAddress: "",
    // companyPostcode: "",
    // companyState: "",
    // firstName: "",
    // lastName: "",
    // phoneNumber: "",
    // residentialAddress: "",
    // residentialPostcode: "",
    // residentialState: "",
  });

  return (
    <VStack
      alignItems="stretch"
      paddingTop="10vh"
      marginX={["16px", "200px"]}
      width="clamp(62.5%, 752px, 100%)"
      maxWidth="752px"
    >
      <Logo />
      <Text marginTop="24px" fontSize="16px" fontWeight="400" textAlign="center">
        {formTitles[formStep]}
      </Text>
      <FormControl as="form">
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
          {formStep === 2 && (
            <StaffInfoPage
              formStep={formStep}
              setFormStep={setFormStep}
              data={data}
              setData={setData}
            />
          )}
        </VStack>
      </FormControl>
    </VStack>
  );
};

export default SignUp;
