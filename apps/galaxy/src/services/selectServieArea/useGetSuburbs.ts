import axios from "../utils/axios";
import { useState } from "react";
import { useToast } from "@cc/ui-chakra";
import { AxiosError } from "axios";
export interface SuburbArray {
  value: number;
  label: string;
}
export interface SuburbData {
  sscCode: number;
  suburbName: string;
  state: string;
  postcode: number;
}
export default function useGetSuburbs() {
  const [suburbs, setSuburbs] = useState<SuburbArray[]>();
  const toast = useToast();
  const suburbsArr: SuburbArray[] = [];

  const getSuburbsInfo = async () => {
    try {
      await axios.get("/suburbs").then((response) => {
        const result = response.data.suburbs;
        result.map((suburb: SuburbData) => {
          const label = `${suburb.suburbName} ${suburb.state}, ${suburb.postcode}`;
          return suburbsArr.push({ value: suburb.sscCode, label: label });
        });
        setSuburbs(suburbsArr);

        return suburbs;
      });
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status === 400) {
        toast({
          title: "error",
          description: "error",
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
  };
  return { getSuburbsInfo };
}
