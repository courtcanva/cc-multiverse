import { useForm } from "react-hook-form";
import { formConfig } from "./formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { StaffInfoFormSchema } from "./SignUpFrom.schema";
import { FormControl, FormInput, FormSelect, Stack, Flex, Button } from "@cc/ui-chakra";
import useSignUp from "@src/services/signup/useSignUp";
import { Dispatch, SetStateAction } from "react";

const StaffInfoPage = (props: {
  formStep: number;
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  data: SignUpFormData;
  setData: Dispatch<SetStateAction<SignUpFormData>>;
}) => {
  const { formStep, setFormStep, data, setData } = props;
  const {
    firstName,
    lastName,
    phoneNumber,
    residentialState,
    residentialPostcode,
    residentialAddress,
  } = formConfig;
  const { register, formState, handleSubmit } = useForm<StaffInfoFormData>({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(StaffInfoFormSchema),
  });
  const { signUp } = useSignUp();
  const goBackFromStep = () => {
    setFormStep(formStep - 1);
  };
  const onSubmit = handleSubmit((formData) => signUp({ ...data, ...formData }));

  return (
    <>
      <FormControl as="form" onSubmit={onSubmit}>
        <Stack>
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
        </Stack>
        <Flex direction="column" gap="16px">
          <Stack marginTop="24px" direction={"row"} justifyContent="stretch">
            <Button flex={1} onClick={goBackFromStep}>
              Back
            </Button>
            <Button type="submit" flex={1} variant="secondary" disabled={!formState.isValid}>
              Submit
            </Button>
          </Stack>
        </Flex>
      </FormControl>
    </>
  );
};

export default StaffInfoPage;
