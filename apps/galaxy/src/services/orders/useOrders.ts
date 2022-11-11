import axios from "../utils/axios";
import { useToast } from "@cc/ui-chakra";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { getToken, getFranchiseeId } from "@src/utils/tokenService";
export interface Order {
  label: string;
  value: number;
}
export interface FormData {
  orders: Order[];
}
interface OrderList {
  contactInformation: string;
  createdTime: string;
  customerId: string;
  id: number;
  orderId: string;
  postcode: string;
  status: string;
  totalAmount: number;
}

interface OrderIdList {
  id: string;
}

export default function useGetOrders() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [lists, setLists] = useState<OrderList[]>([]);

  const getOpenOrders = async () => {
    const token = getToken() || "";
    try {
      const response = await axios.get(`/franchisee/${getFranchiseeId(token)}/pending_orders`);
      const result: OrderList[] = response.data;
      setLists(result);
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

  useEffect(() => {
    getOpenOrders();
  }, []);

  const handleAcceptOrderSubmit = async (data: OrderIdList[]) => {
    setIsLoading(true);
    const token = getToken() || "";

    try {
      await axios.post(`/franchisee/${getFranchiseeId(token)}/accept_orders`, {
        orders: data,
      });
      getOpenOrders();
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

  return { isLoading, handleAcceptOrderSubmit, getOpenOrders, lists };
}
