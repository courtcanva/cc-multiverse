import axios from "../utils/axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useToast } from "@cc/ui-chakra";
import { AxiosError } from "axios";

export default function useSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailExists, setIsEmailExists] = useState(true);
  const toast = useToast();
  const router = useRouter();
  const handleSignUpSubmit = async (data: {
    username: "string";
    password: "string";
    confirmPassword: "string";
    businessName: "string";
    legalEntityName: "string";
    abn: "string";
    contactNumber: "string";
    businessAddress: "string";
    companyPostcode: "string";
    companyState: "string";
    firstName: "string";
    lastName: "string";
    phoneNumber: "string";
    residentialAddress: "string";
    residentialPostcode: "string";
    residentialState: "string";
  }) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/staff/signin", data);
      if (response.status === 200) {
        router.push("/");
      }
    } catch (error) {
      const { response, message } = error as AxiosError;
      if (response?.status === 401) {
        toast({
          title: "Sign in failed",
          description: "Username and password is not authenticated",
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
