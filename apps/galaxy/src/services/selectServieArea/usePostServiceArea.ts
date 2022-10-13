import axios from "../utils/axios";
import { useState } from "react";
import { useToast } from "@cc/ui-chakra";
import { AxiosError } from "axios";
import { useRouter } from "next/router";

interface SuburbGroup {
  label: string;
  value: number;
}

interface FormData {
  suburbs: SuburbGroup[];
}

export default function usePostServiceArea() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const handleServiceAreaSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      const newData = data.suburbs.map((val: SuburbGroup) => {
        return {
          sscCode: val.value,
        };
      });
      const response = await axios.post("/franchisee/1/service_areas", {
        suburbs: newData,
      });
      if (response.status === 200) {
        router.push("/");
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 400) {
        toast({
          title: "error",
          description: "Username and password is not authenticated",
          status: "error",
          duration: 6000,
          position: "top",
          isClosable: true,
        });
      } else {
        toast({
          title: err.message,
          status: "error",
          duration: 6000,
          position: "top",
          isClosable: true,
        });
      }
    }
    setIsLoading(false);
  };
  return { isLoading, handleServiceAreaSubmit };
}
