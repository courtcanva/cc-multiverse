import { useState } from "react";
import { IconVariants } from "@cc/ui-chakra";
import { useRouter } from "next/router";
import customAxios from "../utils/axios";

type VerificationStatus = "verifying" | "success" | "fail";
type VerificationInfo = {
  [key in VerificationStatus]: {
    icon: {
      variant: IconVariants;
      color?: string;
    };
    message: string;
    action?: () => void;
  };
};

export type VerifyEmailRequestData = {
  token: string;
  email: string;
};

export const useVerifyEmail = () => {
  const [status, setStatus] = useState<VerificationStatus>("verifying");
  const router = useRouter();
  const nextRoute = "/";

  const verifications: VerificationInfo = {
    verifying: {
      icon: {
        variant: "loading",
      },
      message: "Verifying your email...",
    },
    success: {
      icon: {
        variant: "check",
        color: "#49B785",
      },
      message: "Your email has been verified!",
      action: () => {
        router.push(nextRoute);
      },
    },
    fail: {
      icon: {
        variant: "cross",
        color: "#972A3A",
      },
      message: "Verification failed",
    },
  };

  const verifyEmail = async (data: VerifyEmailRequestData) => {
    setStatus("verifying");

    try {
      const response = await customAxios.post("/staff/verify", data);

      if (response.status === 202) {
        setStatus("success");
        setTimeout(() => {
          router.push(nextRoute);
        }, 3000);
      }
    } catch (err) {
      setStatus("fail");
    }
  };

  return { verifications, status, verifyEmail };
};
