import { useForm } from "react-hook-form";
import { formConfig } from "./formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpFormInfoSchema } from "./SignUpFrom.schema";
import { FormControl, FormInput, FormSelect } from "@cc/ui-chakra";
import { StateEnum } from "@src/constants";
import useSignUp from "@src/services/signup/useSignUp";

interface FormData {
  firstName: "string";
  lastName: "string";
  phoneNumber: "string";
  residentialAddress: "string";
  residentialPostcode: "string";
  residentialState: StateEnum;
}

const StaffInfoPage = (props: {
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  formStep: number;
}) => {
  const { formStep, setFormStep } = props;
  const {
    firstName,
    lastName,
    phoneNumber,
    residentialState,
    residentialPostcode,
    residentialAddress,
  } = formConfig;
  const { register, formState, handleSubmit } = useForm<FormData>({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(SignUpFormInfoSchema),
  });
  const { handleSignUpSubmit } = useSignUp();

  return (
    <FormControl>
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
    </FormControl>
  );
};

export default StaffInfoPage;
