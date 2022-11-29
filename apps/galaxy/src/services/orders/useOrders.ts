import axios from "../utils/axios";
import { useToast } from "@cc/ui-chakra";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { getFranchiseeId, getToken } from "@src/utils/tokenService";

export type Order = {
  id: number;
  createdTime: string;
  postcode: string;
  totalAmount: number;
  designInformation: DesignInformation;
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

const useGetOrders = () => {
  const toast = useToast();
  const [lists, setLists] = useState<Order[]>([]);

  const getOpenOrders = async () => {
    try {
      const franchiseeId = getFranchiseeId(getToken());
      const response = await axios.get(`/franchisee/${franchiseeId}/pending_orders`);
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

  return { lists };
};

export default useGetOrders;
