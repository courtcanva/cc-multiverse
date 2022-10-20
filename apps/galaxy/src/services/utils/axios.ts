/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { environment } from "../constants/environment";
import useToken from "@src/utils/tokenService";

const { getToken } = useToken();

const token = getToken();
const REQUEST_TIMEOUT = 2000;

const customAxios = axios.create({
  baseURL: environment.API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    Authorization: token as string,
  },
});

export default customAxios;
