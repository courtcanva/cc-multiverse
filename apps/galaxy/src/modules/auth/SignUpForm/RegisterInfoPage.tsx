import { useForm } from "react-hook-form";
import { formConfig } from "./formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpFormInfoSchema } from "./SignUpFrom.schema";
import { FormControl, FormInput, Stack, Flex, Button } from "@cc/ui-chakra";

interface FormData {
  username: string;
  password: string;
  confirmPassword: string;
}

const RegisterInfoPage = (props: {
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  formStep: number;
  data: any;
  setData: any;
}) => {
  const { formStep, setFormStep, data, setData } = props;
  const { username, password, confirmPassword } = formConfig;
  const { register, formState, handleSubmit } = useForm<FormData>({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(SignUpFormInfoSchema),
  });
  const onSubmit = handleSubmit((formData) => setData({ ...formData, data }));
  const goNextFromStep = () => {
    formStep !== 0 && setFormStep(formStep + 1);
  };
  return (
    <>
      <Stack>
        <FormControl as="form" onSubmit={onSubmit}>
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
      </Stack>
      <Flex direction="column" gap="16px">
        <Stack marginTop="24px" direction={"row"} justifyContent="stretch">
          <Button
            flex={1}
            type="submit"
            onClick={goNextFromStep}
            variant="secondary"
            disabled={!formState.isValid}
          >
            Next
          </Button>
        </Stack>
      </Flex>
    </>
  );
};

export default RegisterInfoPage;
