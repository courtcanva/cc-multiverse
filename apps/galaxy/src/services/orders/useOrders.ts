import axios from "../utils/axios";
import { useToast } from "@cc/ui-chakra";
// import { useEffect, useState, useMemo } from "react";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
// import { useRouter } from "next/router";
// import router from "next/router";
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
  // const router = useRouter();
  // // console.log(router);
  // const { franchiseeId } = router.query;

  const getOpenOrders = async () => {
    const token = getToken() || "";
    try {
      // console.log(router);
      // const { franchiseeId } = router.query;
      // const response = await axios.get(`/franchisee/${franchiseeId}/pending_orders`);
      const response = await axios.get(`/franchisee/${getFranchiseeId(token)}/pending_orders`);
      // console.log(response.data);
      const result: OrderList[] = response.data;
      setLists(result);
      // return lists;
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
  // useMemo(() => {
  //   if (!franchiseeId && franchiseeId !== 0) return;
  //   getOpenOrders();
  // }, [franchiseeId]);
  useEffect(() => {
    getOpenOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
