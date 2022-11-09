import axios from "../utils/axios";
import { useToast } from "@cc/ui-chakra";
import { useState } from "react";
import { AxiosError } from "axios";
// import { useRouter } from "next/router";
// import { getToken, getFranchiseeId } from "@src/utils/tokenService";

// export interface Order {
//   label: string;
//   value: number;
// }
export interface Order {
  label: string;
  value: number;
}

// interface OrderGroup {
//   orders: Order[];
// }
export interface FormData {
  orders: OrderData[];
}

interface OrderData {
  id: number;
}

export default function useGetOrders() {
  const [isLoading, setIsLoading] = useState(false);
  // const [options, setOptions] = useState<Order[]>([]);
  const toast = useToast();
  // const router = useRouter();

  const getOpenOrders = async () => {
    try {
      const response = await axios.get("/api/franchisee/1/pending_orders");
      // const response = await axios.get("/franchisee/1/pending_orders");
      const result = response.data;
      return result;
      // const result: OrderData[] = response.data.orders;
      // const ordersArr = result.map(({ id }) => {
      //   const label = `${id}`;
      //   return { value: id, label };
      // });
      // setOptions(ordersArr);
      // return options;
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
        // const response = await axios.post("/franchisee/1/accept_orders", {
        orders: data,
      });
      // if (response.status === 200) {
      //   router.push("/");
      // }
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
