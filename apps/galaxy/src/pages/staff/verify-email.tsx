import React from "react";
import EmailVerification from "@src/modules/auth/EmailVerification";
import { useVerifyEmail } from "@src/services/verify-email/useVerifyEmail";
import Head from "@src/utils/Head";

export default function EmailVerificationPage() {
  const { verificationInfos, status } = useVerifyEmail();

  return (
    <Head title="Email Verification">
      <EmailVerification {...verificationInfos[status]} />
    </Head>
  );
}
