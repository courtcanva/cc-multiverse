/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { environment } from "../constants/environment";
import { getToken } from "@src/utils/tokenService";

const token = getToken() || "";
const REQUEST_TIMEOUT = 2000;

const customAxios = axios.create({
  baseURL: environment.API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    Authorization: token,
  },
});

export default customAxios;
