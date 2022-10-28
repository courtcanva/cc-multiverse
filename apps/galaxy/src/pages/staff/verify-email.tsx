import React, { useEffect } from "react";
import { isEmpty } from "lodash-es";
import EmailVerification from "@src/modules/auth/EmailVerification";
import { useVerifyEmail, VerifyEmailRequestData } from "@src/services/verify-email/useVerifyEmail";
import { useRouter } from "next/router";
import Head from "@src/utils/Head";

export default function EmailVerificationPage() {
  const { verificationInfos, status, verifyEmail } = useVerifyEmail();
  const router = useRouter();

  useEffect(() => {
    if (!isEmpty(router.query)) {
      verifyEmail(router.query as VerifyEmailRequestData);
    }
  }, [router]);

  return (
    <Head title="Email Verification">
      <EmailVerification {...verificationInfos[status]} />
    </Head>
  );
}
