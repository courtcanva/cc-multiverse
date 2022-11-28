import axios from "../utils/axios";
import { useToast } from "@cc/ui-chakra";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { getToken, getFranchiseeId } from "@src/utils/tokenService";

export interface Order {
  checked: boolean;
  id: number;
  createdTime: string;
  postcode: string;
  totalAmount: number;
  designInformation: DesignInformation;
}

export interface FormData {
  orders: Order[];
}

export type DesignInformation = {
  quotation: string;
  constructionDraw: string;
  isNeedLevelGround: boolean;
  constructionAddress: {
    country: string;
    state: string;
    city: string;
    line1: string;
    line2: string;
    postalCode: string;
  };
};

export type OrderIdList = Array<number | undefined>;

export default function useGetOrders() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [lists, setLists] = useState<Order[]>([]);

  const getOpenOrders = async () => {
    const token = getToken() || "";
    try {
      const response = await axios.get(`/franchisee/${getFranchiseeId(token)}/pending_orders`);
      const result: Order[] = response.data;
      const orderList = result.map((val) => {
        val.checked = false;
        return val;
      });
      setLists(orderList);
    } catch (error) {
      toast({
        title: "Server Error",
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

  const handleAcceptOrderSubmit = async (data: OrderIdList) => {
    setIsLoading(true);
    const token = getToken() || "";
    try {
      await axios.post(`/franchisee/${getFranchiseeId(token)}/accept_orders`, {
        orders: data,
      });
      toast({
        title: "Accept Successfully",
        status: "info",
        duration: 6000,
        position: "top",
        isClosable: true,
      });
      getOpenOrders();
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === 404) {
        toast({
          title: "error",
          description: "You have not selected any order",
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

  return { isLoading, handleAcceptOrderSubmit, getOpenOrders, lists };
}
