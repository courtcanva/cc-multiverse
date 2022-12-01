import axios from "../utils/axios";
import { useToast } from "@cc/ui-chakra";
import { useEffect, useState } from "react";
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

export type OrderIdList = Array<number | undefined>;

export default function useGetOrders() {
  const toast = useToast();
  const [lists, setLists] = useState<Order[]>([]);

  const getAcceptedOrders = async () => {
    const token = getToken() || "";
    try {
      const response = await axios.get(`/franchisee/${getFranchiseeId(token)}/accepted_orders`);
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
    getAcceptedOrders();
  }, []);

  return { getAcceptedOrders, lists };
}
