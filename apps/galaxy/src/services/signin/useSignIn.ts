import axios from "../utils/axios";
import { useState } from "react";
import { useRouter } from "next/router";
import { useToast } from "@cc/ui-chakra";
import { AxiosError } from "axios";
import tokenService from "@src/utils/tokenService";

export default function useSignIn() {
  const { setToken } = tokenService();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const handleSignInSubmit = async (data: { username: string; password: string }) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/staff/signin", data);
      if (response.status === 200) {
        const token: string = response.headers.authorization;
        setToken(token);
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

  return { isLoading, handleSignInSubmit };
}
