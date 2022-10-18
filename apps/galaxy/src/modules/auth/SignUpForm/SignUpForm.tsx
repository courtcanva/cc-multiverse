import React from "react";
import { useForm } from "react-hook-form";
import useSignUp from "@src/services/signup/useSignUp";
import {
  Button,
  FormLabel,
  FormControl,
  Input,
  Stack,
  VStack,
  Select,
  Flex,
  Text,
} from "@cc/ui-chakra";
import { formConfig } from "./formConfig";
import { StateEnum } from "@src/constants";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpFormInfoSchema } from "./SignUpFrom.schema";
import { FormErrorMessage } from "@chakra-ui/react";
// import { Select } from "@cc/ui-chakra/src/base";
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
  const { handleSignUpSubmit } = useSignUp();
  const [formStep, setFormStep] = React.useState(0);
  const goNextFromStep = () => {
    setFormStep((cur) => cur + 1);
  };
  const goBackFromStep = () => {
    setFormStep((cur) => cur - 1);
  };
  const renderHeader = () => {
    if (formStep == 0) {
      return (
        <VStack align="start" alignItems="center" spacing="24px">
          <Stack>
            <Text height="72px" fontSize="22" fontWeight="bold">
              Register with CourtCanva as our franchisee
            </Text>
          </Stack>
        </VStack>
      );
    } else if (formStep == 1) {
      return (
        <VStack align="start" alignItems="center" spacing="24px">
          <Stack>
            <Text height="72px" fontSize="22" fontWeight="bold">
              Please Fill in your company information details
            </Text>
          </Stack>
        </VStack>
      );
    } else {
      return (
        <VStack align="start" alignItems="center" spacing="24px">
          <Stack>
            <Text height="72px" fontSize="22" fontWeight="bold">
              Please fill in your personal information
            </Text>
          </Stack>
        </VStack>
      );
    }
  };
  const renderButton = () => {
    if (formStep == 0) {
      return (
        <Stack marginTop="24px">
          <Button type="submit" onClick={goNextFromStep} variant="secondary">
            Next
          </Button>
        </Stack>
      );
    } else if (formStep == 1) {
      return (
        <Stack marginTop="24px">
          <Flex direction="row" gap="20px" alignItems="center" justifyContent="center">
            <Button width="240px" onClick={goBackFromStep} type="submit" variant="primary">
              Back
            </Button>
            <Button width="240px" onClick={goNextFromStep} type="submit" variant="secondary">
              Next
            </Button>
          </Flex>
        </Stack>
      );
    } else {
      return (
        <Stack marginTop="24px">
          <Flex direction="row" gap="20px" alignItems="center" justifyContent="center">
            <Button width="240px" onClick={goBackFromStep} type="submit" variant="primary">
              Back
            </Button>
            <Button width="240px" role="signin" type="submit" variant="secondary">
              Submit
            </Button>
          </Flex>
        </Stack>
      );
    }
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
      {renderHeader()}
      {formStep === 0 && (
        <section>
          <VStack align="start" alignItems="stretch" spacing="24px">
            <Stack>
              <FormControl isInvalid={true}>
                <FormLabel fontWeight="600">Email</FormLabel>
                <Input {...username} {...register("username")} isRequired={true} />
                <FormErrorMessage>error</FormErrorMessage>
              </FormControl>
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
              <Select
                {...register("companyState")}
                isRequired={true}
                variant="outline"
                placeholder="Please select a state"
              >
                <option value="NSW">NSW</option>
                <option value="VIC">VIC</option>
                <option value="QLD">QLD</option>
                <option value="SA">SA</option>
                <option value="WA">WA</option>
                <option value="TAS">TAS</option>
                <option value="NT">NT</option>
                <option value="ACT">ACT</option>
              </Select>
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
              <Select
                variant="outline"
                placeholder="Please select a state"
                {...register("residentialState")}
              >
                <option value="NSW">NSW</option>
                <option value="VIC">VIC</option>
                <option value="QLD">QLD</option>
                <option value="SA">SA</option>
                <option value="WA">WA</option>
                <option value="TAS">TAS</option>
                <option value="NT">NT</option>
                <option value="ACT">ACT</option>
              </Select>
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
        </section>
      )}
      {renderButton()}
    </FormControl>
  );
};

export default SignUpForm;
