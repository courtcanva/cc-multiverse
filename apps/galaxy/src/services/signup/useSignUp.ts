import axios from "../utils/axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useToast } from "@cc/ui-chakra";
import { AxiosError } from "axios";
import { FormData } from "@src/modules/auth/SignUpForm/SignUpForm";

export default function useSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailExists, setIsEmailExists] = useState(true);
  const toast = useToast();
  const router = useRouter();
  const handleSignUpSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/franchisee/signup", {
        franchiseePostDto: {
          businessName: data.businessName,
          legalEntityName: data.legalEntityName,
          abn: data.abn,
          contactNumber: data.contactNumber,
          businessAddress: data.businessAddress,
          state: data.companyState,
          postcode: data.companyPostcode,
        },
        staffPostDto: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.username,
          residentialAddress: data.residentialAddress,
          phoneNumber: data.phoneNumber,
          postcode: data.residentialPostcode,
          state: data.residentialState,
          password: data.password,
        },
      });
      if (response.status === 200) {
        toast({
          title: "Registration completed successfully!",
          description: "Please check your registered email for email verification",
          status: "success",
          duration: 6000,
          position: "top",
          isClosable: true,
        });
        router.push("/sign-in");
      }
    } catch (error) {
      const { response, message } = error as AxiosError;
      if (response?.status === 400) {
        toast({
          title: "Sign up failed",
          description: "Duplicated user",
          status: "error",
          duration: 6000,
          position: "top",
          isClosable: true,
        });
      } else {
        toast({
          title: message,
          status: "error",
          duration: 6000,
          position: "top",
          isClosable: true,
        });
      }
    }
    setIsLoading(false);
  };
  const checkEmailRequest = async (email: string | null | undefined) => {
    try {
      const response = await axios.get(`staffs/emails/${email}`);
      if (response.status === 200) {
        setIsEmailExists(false);
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 400) {
        setIsEmailExists(true);
        toast({
          title: "Email format invalid",
          description: "Email format is invalid",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      if (err.response?.status === 409) {
        setIsEmailExists(true);
        toast({
          title: "Email exists.",
          description: "This email is already been registered.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };
  return { isLoading, handleSignUpSubmit, isEmailExists, checkEmailRequest };
}
