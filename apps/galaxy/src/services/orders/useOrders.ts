import axios from "../utils/axios";
import { useToast } from "@cc/ui-chakra";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { getFranchiseeId, getToken } from "@src/utils/tokenService";

export interface Order {
  label: string;
  value: number;
}

export type Orders = {
  id: number;
  createdTime: string;
  postcode: string;
  totalAmount: number;
  designInformation: DesignInformation;
};

type OrderList = {
  contactInformation: {
    name: string;
    phone: string;
  };
  designInformation: DesignInformation;
  createdTime: string;
  customerId: string;
  id: number;
  orderId: string;
  suburb: string;
  postcode: string;
  status: string;
  totalAmount: number;
};

export type Test = {
  quotation: string;
  constructionDraw: string;
  isNeedLevelGround: boolean;
};

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
  design: Design;
  quotationDetails: QuotationDetails[];
};

export type Design = {
  designName: string;
  tileColor: TileColor[];
  courtSize: CourtSize;
};

export type QuotationDetails = {
  color: string;
  quantity: number;
};

export type TileColor = {
  location: string;
  color: string;
};

export type CourtSize = {
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

export default function useGetOrders(endpoint: string) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [lists, setLists] = useState<OrderList[]>([]);

  const getOpenOrders = async () => {
    try {
      const franchiseeId = getFranchiseeId(getToken());
      const response = await axios.get(`/franchisee/${franchiseeId}/${endpoint}`);
      setLists(response.data);
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

  return { isLoading, getOpenOrders, lists };
}
