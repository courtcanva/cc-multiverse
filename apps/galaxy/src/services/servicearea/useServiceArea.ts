import axios from "../utils/axios";
import { useToast } from "@cc/ui-chakra";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getToken, getFranchiseeId } from "@src/utils/tokenService";

export interface SuburbOption {
  label: string;
  value: number;
}

export interface FormData {
  filterMode: string;
  suburbs: SuburbOption[];
}

interface SuburbData {
  sscCode: number;
  suburbName: string;
  state: string;
  postcode: number;
}

export default function useServiceArea() {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<SuburbOption[]>([]);
  const toast = useToast();
  const router = useRouter();

  const getSuburbsInfo = async () => {
    try {
      const response = await axios.get("/suburbs");
      const result: SuburbData[] = response.data.suburbs;
      const suburbsArr = result.map(({ suburbName, sscCode, state, postcode }) => {
        const label = `${suburbName} ${state}, ${postcode}`;
        return { value: sscCode, label };
      });
      setOptions(suburbsArr);
      return options;
    } catch (error) {
      toast({
        title: "Server Error",
        status: "error",
        duration: 6000,
        position: "top",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getSuburbsInfo();
  }, []);

  const handleServiceAreaSubmit = async (data: FormData) => {
    setIsLoading(true);
    const token = getToken() || "";

    try {
      const newData = data.suburbs.map(({ value }) => ({ sscCode: value }));
      await axios.post(
        `/franchisee/${getFranchiseeId(token)}/service_areas`,
        {
          filterMode: data.filterMode,
          suburbs: newData,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      toast({
        title: "Submit Successfully",
        status: "info",
        duration: 6000,
        position: "top",
        isClosable: true,
      });
      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 403) {
        toast({
          title: "Authorization error",
          description: "Username and password is not authenticated",
          status: "error",
          duration: 6000,
          position: "top",
          isClosable: true,
        });
      } else {
        toast({
          title: "Service Error",
          description: "Service not response",
          status: "error",
          duration: 6000,
          position: "top",
          isClosable: true,
        });
      }
    }
    setIsLoading(false);
  };

  return { isLoading, handleServiceAreaSubmit, options };
}
