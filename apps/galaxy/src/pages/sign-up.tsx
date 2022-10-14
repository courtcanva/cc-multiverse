import type { NextPage } from "next";
import HeaderLayout from "../layouts/HeaderLayout";
import { SignUp } from "../modules/auth/SignUpForm/index";

const SignUpPage: NextPage = () => {
  return (
    <HeaderLayout title="Sign Up">
      <SignUp />
    </HeaderLayout>
  );
};

export default SignUpPage;
