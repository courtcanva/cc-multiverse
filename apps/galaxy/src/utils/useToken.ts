import axios from "@src/services/utils/axios";
import { AxiosError } from "axios";

export default function useToken() {
  const setToken = (token: string) => {
    localStorage.setItem("userToken", token);
  };

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userToken");
    }
  };

  const checkToken = async () => {
    try {
      await axios.post("/staff/refresh");
    } catch (error) {
      const { response } = error as AxiosError;
      return response?.status;
    }
  };

  return { setToken, getToken, checkToken };
}
