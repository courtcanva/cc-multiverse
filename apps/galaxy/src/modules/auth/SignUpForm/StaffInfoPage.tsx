import { useForm } from "react-hook-form";
import { formConfig } from "./formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { StaffInfoFormSchema } from "./SignUpFrom.schema";
import { FormControl, FormInput, FormSelect, Stack, VStack, Button } from "@cc/ui-chakra";
import useSignUp from "@src/services/signup/useSignUp";
import { Dispatch, SetStateAction } from "react";

type SignUpProps = {
  data: SignUpFormData;
  setData: Dispatch<SetStateAction<SignUpFormData>>;
};
const StaffInfoPage = ({ data }: SignUpProps) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    residentialState,
    residentialPostcode,
    residentialAddress,
  } = formConfig;
  const { register, formState, handleSubmit } = useForm<StaffInfoFormData>({
    defaultValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      residentialState: data.residentialState,
      residentialPostcode: data.residentialPostcode,
      residentialAddress: data.residentialAddress,
    },
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(StaffInfoFormSchema),
  });
  const { signUp, isLoading } = useSignUp();
  const onSubmit = handleSubmit((formData) => signUp({ ...data, ...formData }));

  return (
    <FormControl as="form" onSubmit={onSubmit}>
      <VStack spacing="24px" alignItems="stretch">
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
        <Button
          type="submit"
          variant="secondary"
          disabled={!formState.isValid}
          isLoading={isLoading}
        >
          Submit
        </Button>
      </VStack>
    </FormControl>
  );
};

export default StaffInfoPage;
