import axios from "axios";
import { environment } from "../constants/environment";

const REQUEST_TIMEOUT = 2000;
const customAxios = axios.create({
  baseURL: environment.API_BASE_URL,
  timeout: REQUEST_TIMEOUT,
});

export default customAxios;
