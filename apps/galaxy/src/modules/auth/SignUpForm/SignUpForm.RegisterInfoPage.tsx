import { useForm } from "react-hook-form";
import { formConfig } from "./formConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpFormInfoSchema } from "./SignUpFrom.schema";
import { FormControl, FormInput, Stack, Flex, Button } from "@cc/ui-chakra";

interface FormData {
  username: "string";
  password: "string";
  confirmPassword: "string";
}

const RegisterInfoPage = (props: {
  setFormStep: React.Dispatch<React.SetStateAction<number>>;
  formStep: number;
  data: any;
  setData: any;
}) => {
  const { formStep, setFormStep, data, setData } = props;
  const { username, password, confirmPassword } = formConfig;
  const { register, formState } = useForm<FormData>({
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: yupResolver(SignUpFormInfoSchema),
  });

  return (
    <>
      <Stack>
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
      </Stack>
      <Flex direction="column" gap="16px">
        <Stack marginTop="24px" direction={["column", "row"]} justifyContent="stretch">
          {formStep !== 0 && (
            <Button flex={1} onClick={goBackFromStep}>
              Back
            </Button>
          )}
          {formStep === 2 ? (
            <Button type="submit" flex={1} variant="secondary" disabled={false}>
              Submit
            </Button>
          ) : (
            <Button flex={1} onClick={goNextFromStep} variant="secondary" disabled={false}>
              Next
            </Button>
          )}
        </Stack>
      </Flex>
    </>
  );
};

export default RegisterInfoPage;
