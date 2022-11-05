import { useForm } from "react-hook-form";
import { formConfig } from "./formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterInfoFormSchema } from "./SignUpFrom.schema";
import useSignUp from "@src/services/signup/useSignUp";
import { FormControl, FormInput, Stack, Flex, Button } from "@cc/ui-chakra";
import { Dispatch, SetStateAction } from "react";

const RegisterInfoPage = (props: {
  formStep: number;
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  data: SignUpFormData;
  setData: Dispatch<SetStateAction<SignUpFormData>>;
}) => {
  const { formStep, setFormStep, data, setData } = props;
  const { username, password, confirmPassword } = formConfig;
  const { checkEmailIsExists } = useSignUp();
  const { register, formState, getValues, handleSubmit } = useForm<RegisterInfoFormData>({
    defaultValues: {
      username: data.username,
      password: data.password,
      confirmPassword: data.confirmPassword,
    },
    mode: "all",
    reValidateMode: "onChange",
    resolver: yupResolver(RegisterInfoFormSchema),
  });
  const goNextFromStep = async () => {
    const isEmailExists = await checkEmailIsExists(getValues("username"));
    if (!isEmailExists) {
      setFormStep(formStep + 1);
    }
  };
  const onSubmit = handleSubmit((formData) => {
    setData({ ...data, ...formData });
    goNextFromStep();
  });
  return (
    <>
      <FormControl as="form" onSubmit={onSubmit}>
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
        <Flex direction="column" gap="16px">
          <Stack marginTop="24px" direction={"row"} justifyContent="stretch">
            <Button flex={1} type="submit" variant="secondary" disabled={!formState.isValid}>
              Next
            </Button>
          </Stack>
        </Flex>
      </FormControl>
    </>
  );
};

export default RegisterInfoPage;
