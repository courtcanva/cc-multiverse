import React, { useEffect } from "react";
import { isEmpty } from "lodash-es";
import EmailVerification from "@src/modules/auth/EmailVerification";
import { useVerifyEmail, VerifyEmailRequestData } from "@src/services/verify-email/useVerifyEmail";
import { useRouter } from "next/router";

export default function EmailVerificationPage() {
  const { verifications, status, verifyEmail } = useVerifyEmail();
  const router = useRouter();

  useEffect(() => {
    console.log(router);

    if (!isEmpty(router.query)) {
      verifyEmail(router.query as VerifyEmailRequestData);
    }
  }, [router]);

  return (
    <div>
      <EmailVerification {...verifications[status]} />
    </div>
  );
}
