import axios from "../utils/axios";
import { useToast } from "@cc/ui-chakra";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { getToken, getFranchiseeId } from "@src/utils/tokenService";

export interface Suburb {
  label: string;
  value: number;
}

export interface FormData {
  filterMode: string;
  suburbs: Suburb[];
}

interface SuburbData {
  sscCode: number;
  suburbName: string;
  state: string;
  postcode: number;
}

export default function useServiceArea() {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<Suburb[]>([]);
  const toast = useToast();
  const router = useRouter();

  const getSuburbsInfo = async () => {
    try {
      const response = await axios.get("/suburbs");
      const result = response.data.suburbs;
      const suburbsArr: Suburb[] = (result as Array<SuburbData>)?.map((suburb) => {
        const label = `${suburb.suburbName} ${suburb.state}, ${suburb.postcode}`;
        return { value: suburb.sscCode, label: label };
      });
      setOptions(suburbsArr);
      return options;
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

  useEffect(() => {
    getSuburbsInfo();
  }, []);

  const handleServiceAreaSubmit = async (data: FormData) => {
    setIsLoading(true);
    const token = getToken() || "";

    try {
      const newData = data.suburbs.map((val: Suburb) => {
        return {
          sscCode: val.value,
        };
      });
      const response = await axios.post(
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
      if (response.status === 200) {
        toast({
          title: "Service Area Selection Submit in Success",
          status: "info",
          duration: 6000,
          position: "top",
          isClosable: true,
        });
        router.push("/");
      }
      throw new AxiosError("Bad Request Error");
    } catch (error) {
      // const err = error as AxiosError;
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
          title: "Submit Service Area Failed",
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
