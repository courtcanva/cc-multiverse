import jwtDecode from "jwt-decode";

type jwtToken = {
  exp: number;
};

export const setToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

export const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
};

export const checkTokenExpiration = () => {
  const token = getToken();
  const parseToken: jwtToken = jwtDecode(token as string);
  const utcTimestamp = new Date();
  const exp = new Date(0);
  exp.setUTCSeconds(parseToken?.exp as number);
  return utcTimestamp > exp;
};
