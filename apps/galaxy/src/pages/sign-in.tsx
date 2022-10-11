import type { NextPage } from "next";
import HeaderLayout from "../layouts/HeaderLayout";
import SignIn from "../modules/auth/SignInForm/index";

const SignInPage: NextPage = () => {
  return (
    <HeaderLayout title="Sign In">
      <SignIn />
    </HeaderLayout>
  );
};

export default SignInPage;
