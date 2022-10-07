import { Button, Container, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import useSignIn from "../../../services/signin/useSignIn";

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
    <form onSubmit={handleSubmit(formSubmit)}>
      <FormLabel fontWeight="600">Email</FormLabel>
      <Input
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
        role="signIn"
        variant={"signInBtn"}
        marginTop="48px"
        type="submit"
        isLoading={isLoading}
      >
        Sign In
      </Button>
    </form>
  );
};

export default SignInForm;
