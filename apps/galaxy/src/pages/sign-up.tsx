import type { NextPage } from "next";
import Head from "../utils/Head";
import SignUp from "../modules/auth/SignUpForm/index";

const SignUpPage: NextPage = () => {
  return (
    <Head title="Sign Up">
      <SignUp />
    </Head>
  );
};

export default SignUpPage;
