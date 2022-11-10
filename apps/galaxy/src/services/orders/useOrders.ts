import axios from "../utils/axios";
import { useToast } from "@cc/ui-chakra";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
// import { result } from "lodash-es";
// import { type } from "os";
// import { getToken, getFranchiseeId } from "@src/utils/tokenService";
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
// interface OrderData {
//   contactInformation: string;
//   createdTime: string;
//   customerId: string;
//   id: number;
//   orderId: string;
//   postcode: string;
//   status: string;
//   totalAmount: number;
// }

export default function useGetOrders() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [lists, setLists] = useState<OrderList[]>([]);

  const getOpenOrders = async () => {
    try {
      const response = await axios.get("/franchisee/1/pending_orders");
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

  useEffect(() => {
    getOpenOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAcceptOrderSubmit = async (data: OrderIdList[]) => {
    setIsLoading(true);

    try {
      await axios.post("/franchisee/1/accept_orders", {
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

  return { isLoading, handleAcceptOrderSubmit, getOpenOrders, lists };
}
