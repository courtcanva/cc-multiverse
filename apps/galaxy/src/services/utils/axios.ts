/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { environment } from "../constants/environment";
import { getToken } from "@src/utils/tokenService";

const REQUEST_TIMEOUT = 2000;

type config = {
  url: string;
};

const urlWhiteList = ["/staff/signin", "/franchisee/signup", "/staff/verify"];

const customAxios = axios.create({
  baseURL: environment.API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
});

customAxios.interceptors.request.use(
  function (config) {
    const { url } = <config>config;
    const token = getToken() || "";
    const customConfig = {
      ...config,
      headers: {
        ...config.headers,
        Authorization: urlWhiteList.includes(url) ? "" : token,
      },
    };
    return customConfig;
  },

  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
export default customAxios;
