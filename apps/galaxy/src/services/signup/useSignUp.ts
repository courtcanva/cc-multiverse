import axios from "../utils/axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useToast } from "@cc/ui-chakra";
import { AxiosError } from "axios";

export default function useSignUp() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const signUp = async (data: SignUpFormData) => {
    setIsLoading(true);
    try {
      const {
        username,
        password,
        confirmPassword,
        businessName,
        legalEntityName,
        abn,
        contactNumber,
        businessAddress,
        companyPostcode,
        companyState,
        firstName,
        lastName,
        phoneNumber,
        residentialAddress,
        residentialPostcode,
        residentialState,
      } = data;
      const transformedData = {
        franchiseePostDto: {
          businessName,
          legalEntityName,
          abn,
          contactNumber,
          businessAddress,
          companyState,
          companyPostcode,
        },
        staffPostDto: {
          firstName,
          lastName,
          username,
          residentialAddress,
          phoneNumber,
          residentialPostcode,
          residentialState,
          password,
        },
      };
      console.log(transformedData);

      const response = await axios.post("/franchisee/signup", transformedData);
      if (response.status === 201) {
        toast({
          title: "Registration completed successfully!",
          description: "Please check your registered email for email verification",
          status: "info",
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
  return { signUp, isLoading };
}
