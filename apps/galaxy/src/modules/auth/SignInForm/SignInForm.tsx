import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import useSignIn from "../../../services/signin/useSignIn";
import { AInput as Input } from "@cc/ui-chakra";
import { Button, Container, FormLabel, FormControl } from "@cc/ui-chakra";

interface FormData {
  email: string;
  password: string;
}

const SignInForm = () => {
  const { isLoading, handleSignInSubmit } = useSignIn();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormData>();
  const formSubmit = ({ email, password }: FormData) => {
    handleSignInSubmit(email, password);
  };
  const showError = (obj: { message: string }) => {
    return <p>{obj.message}</p>;
  };

  return (
    <FormControl as="form" width="100%" onSubmit={handleSubmit(formSubmit)}>
      <FormLabel fontWeight="600">Email</FormLabel>
      <Input
        width="100%"
        placeholder="Enter email"
        role="email"
        type="email"
        {...register("email", {
          required: "Username is required",
        })}
      />
      <Container color="red">
        <ErrorMessage errors={errors} name="email" render={showError} />
      </Container>
      <FormLabel marginTop="24px" fontWeight="600">
        Password
      </FormLabel>
      <Input
        placeholder="Enter password"
        role="password"
        type="password"
        {...register("password", {
          required: "Password is required",
        })}
      />
      <Container color="red">
        <ErrorMessage errors={errors} name="password" render={showError} />
      </Container>
      <Button
        width="100%"
        role="signIn"
        variant="accent"
        marginTop="48px"
        type="submit"
        isLoading={isLoading}
      >
        Sign In
      </Button>
    </FormControl>
  );
};

export default SignInForm;
