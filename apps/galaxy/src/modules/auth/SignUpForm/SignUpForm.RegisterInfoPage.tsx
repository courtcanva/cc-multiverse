import { FormData } from "./SignUpForm";
import { useForm } from "react-hook-form";
import { formConfig } from "./formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpFormInfoSchema } from "./SignUpFrom.schema";
import { FormControl, FormInput } from "@cc/ui-chakra";

const RegisterInfoPage = () => {
  const { username, password, confirmPassword } = formConfig;
  const { register, formState, getFieldState, getValues, handleSubmit } = useForm<FormData>({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(SignUpFormInfoSchema),
  });

  return (
    <FormControl>
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
    </FormControl>
  );
};

export default RegisterInfoPage;
