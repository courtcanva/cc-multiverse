import axios from "../utils/axios";
import { useToast } from "@cc/ui-chakra";
import { useState } from "react";
import { AxiosError } from "axios";
export interface Order {
  label: string;
  value: number;
}
export interface FormData {
  orders: OrderData[];
}

interface OrderData {
  id: number;
}

export default function useGetOrders() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const getOpenOrders = async () => {
    try {
      const response = await axios.get("/api/franchisee/1/pending_orders");
      const result = response.data;
      return result;
    } catch (error) {
      const err = error as AxiosError;
      toast({
        title: err.message,
        description: "error",
        status: "error",
        duration: 6000,
        position: "top",
        isClosable: true,
      });
    }
  };

  const handleAcceptOrderSubmit = async (data: FormData) => {
    setIsLoading(true);

    try {
      await axios.post("/api/franchisee/1/accept_orders", {
        orders: data,
      });
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

  return { isLoading, handleAcceptOrderSubmit, getOpenOrders };
}
