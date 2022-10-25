import type { NextPage } from "next";
import Head from "../utils/Head";
import SignIn from "../modules/auth/SignInForm/index";

const SignInPage: NextPage = () => {
  return (
    <Head title="Sign In">
      <SignIn />
    </Head>
  );
};

export default SignInPage;
