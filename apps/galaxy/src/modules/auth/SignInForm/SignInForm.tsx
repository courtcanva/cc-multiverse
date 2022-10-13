import React from "react";
import { useForm } from "react-hook-form";
import useSignIn from "@src/services/signin/useSignIn";
import { Button, FormLabel, FormControl, Input, Stack, VStack } from "@cc/ui-chakra";
import { formConfig } from "./formConfig";

interface FormData {
  username: string;
  password: string;
}

const SignInForm = () => {
  const { isLoading, handleSignInSubmit } = useSignIn();
  const { email, password } = formConfig;
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => handleSignInSubmit(data));

  return (
    <FormControl as="form" onSubmit={onSubmit}>
      <VStack align="start" alignItems="stretch" spacing="24px">
        <Stack>
          <FormLabel fontWeight="600">Email</FormLabel>
          <Input {...email} {...register("username")} isRequired={true} />
        </Stack>
        <Stack>
          <FormLabel fontWeight="600">Password</FormLabel>
          <Input {...password} {...register("password")} isRequired={true} />
        </Stack>
      </VStack>
      <Stack marginTop="48px">
        <Button role="signIn" variant="secondary" type="submit" isLoading={isLoading}>
          Sign In
        </Button>
      </Stack>
    </FormControl>
  );
};

export default SignInForm;
