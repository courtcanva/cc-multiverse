import axios from "../utils/axios";
import { useToast } from "@cc/ui-chakra";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { getFranchiseeId, getToken } from "@src/utils/tokenService";

export interface Order {
  label: string;
  value: number;
}

export interface FormData {
  orders: Order[];
}

type OrderList = {
  contactInformation: {
    name: string;
    phone: string;
  };
  designInformation: {
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
  createdTime: string;
  customerId: string;
  id: number;
  orderId: string;
  suburb: string;
  postcode: string;
  status: string;
  totalAmount: number;
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

type OrderIdList = {
  id: string;
};

export default function useGetOrders() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [lists, setLists] = useState<OrderList[]>([]);

  const getOpenOrders = async () => {
    try {
      // todo load value to here
      const franchiseeId = getFranchiseeId(getToken());
      const response = await axios.get(`/franchisee/${franchiseeId}/pending_orders`);
      console.log(response.data);
      console.log(response.data[3].designInformation);
      setLists(response.data);
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
