import axios from "../utils/axios";
import { useToast } from "@cc/ui-chakra";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

interface Suburb {
  label: string;
  value: number;
}

interface FormData {
  filterMode: string;
  suburbs: Suburb[];
}

export default function useGetSuburbs() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const router = useRouter();

  const getSuburbsInfo = async () => {
    try {
      const response = await axios.get("/suburbs");
      const result = response.data.suburbs;
      return result;
    } catch (error) {
      const err = error as AxiosError;
      toast({
        title: err.message,
        status: "error",
        duration: 6000,
        position: "top",
        isClosable: true,
      });
    }
  };

  const handleServiceAreaSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      const newData = data.suburbs.map((val: Suburb) => {
        return {
          sscCode: val.value,
        };
      });
      const response = await axios.post("/franchisee/1/service_areas", {
        filterMode: data.filterMode,
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

  return { isLoading, handleServiceAreaSubmit, getSuburbsInfo };
}
