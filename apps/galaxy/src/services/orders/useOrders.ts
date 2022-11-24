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

export type OrderList = {
  checked: boolean;
  contactInformation: string;
  designInformation: string;
  createdTime: string;
  customerId: string;
  id: number;
  orderId: string;
  suburb: string;
  postcode: string;
  status: string;
  totalAmount: number;
};

export type DesignInformation = {
  quotation: string;
  constructionDraw: string;
  isNeedLevelGround: boolean;
  design: Design;
  quotationDetails: QuotationDetails[];
  constructionAddress: {
    country: string;
    state: string;
    city: string;
    line1: string;
    line2: string;
    postalCode: string;
  };
};

type Design = {
  designName: string;
  tileColor: TileColor[];
  courtSize: CourtSize;
};

type QuotationDetails = {
  color: string;
  quantity: number;
};

type TileColor = {
  location: string;
  color: string;
};

type CourtSize = {
  name: string;
  length: number;
  width: number;
  centreCircleRadius: number;
  threePointRadius: number;
  threePointLine: number;
  lengthOfCorner: number;
  restrictedAreaLength: number;
  restrictedAreaWidth: number;
  sideBorderWidth: number;
  lineBorderWidth: number;
};

export type OrderIdList = Array<number | undefined>;

export default function useGetOrders() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [lists, setLists] = useState<OrderList[]>([]);

  const getOpenOrders = async () => {
    const token = getToken() || "";
    try {
      const response = await axios.get(`/franchisee/${getFranchiseeId(token)}/pending_orders`);
      const result: OrderList[] = response.data;
      const arr = result.map((val) => {
        val.checked = false;
        return val;
      });
      setLists(arr);
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
      const err = error as AxiosError;
      if (err.response?.status === 404) {
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
