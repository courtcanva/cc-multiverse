import React from "react";
import { useForm } from "react-hook-form";
import useSignIn from "@src/services/signin/useSignIn";
import {
  Button,
  FormLabel,
  FormControl,
  Input,
  Stack,
  VStack,
  Center,
  Link as CKLink,
} from "@cc/ui-chakra";
import { formConfig } from "./formConfig";
import Link from "next/link";
interface FormData {
  username: string;
  password: string;
}

const SignInForm = () => {
  const { isLoading, handleSignInSubmit } = useSignIn();
  const { username, password } = formConfig;
  const { register, handleSubmit } = useForm<FormData>();
  const onSubmit = handleSubmit((data) => handleSignInSubmit(data));

  return (
    <FormControl as="form" onSubmit={onSubmit}>
      <VStack align="start" alignItems="stretch" spacing="24px">
        <Stack>
          <FormLabel htmlFor="username" fontWeight="600">
            Username
          </FormLabel>
          <Input {...username} {...register("username")} isRequired={true} />
        </Stack>
        <Stack>
          <FormLabel htmlFor="password" fontWeight="600">
            Password
          </FormLabel>
          <Input {...password} {...register("password")} isRequired={true} />
        </Stack>
      </VStack>
      <VStack marginTop="48px" spacing="24px" alignItems="stretch">
        <Button variant="secondary" type="submit" isLoading={isLoading}>
          Sign In
        </Button>
        <Center>
          Don&lsquo;t have an account? &nbsp;
          <Link href={"/sign-up"}>
            <CKLink color="blue">Register Here</CKLink>
          </Link>
        </Center>
      </VStack>
    </FormControl>
  );
};

export default SignInForm;
