import { useForm } from "react-hook-form";
import { formConfig } from "./formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterInfoFormSchema } from "./SignUpFrom.schema";
import { FormControl, FormInput, Stack, VStack, Button } from "@cc/ui-chakra";
import { Dispatch, SetStateAction } from "react";

type SignUpProps = {
  formStep: number;
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  data: SignUpFormData;
  setData: Dispatch<SetStateAction<SignUpFormData>>;
};
const RegisterInfoPage = ({ formStep, setFormStep, data, setData }: SignUpProps) => {
  const { username, password, confirmPassword } = formConfig;
  const { register, formState, handleSubmit } = useForm<RegisterInfoFormData>({
    defaultValues: {
      username: data.username,
      password: data.password,
      confirmPassword: data.confirmPassword,
    },
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(RegisterInfoFormSchema),
  });
  const onSubmit = handleSubmit((formData) => {
    setData({ ...data, ...formData });
    goNextFromStep();
  });
  const goNextFromStep = () => {
    setFormStep(formStep + 1);
  };
  return (
    <FormControl as="form" onSubmit={onSubmit}>
      <VStack spacing="24px" alignItems="stretch">
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
        <Button type="submit" variant="secondary" disabled={!formState.isValid}>
          Next
        </Button>
      </VStack>
    </FormControl>
  );
};

export default RegisterInfoPage;
