import jwtDecode from "jwt-decode";

type jwtToken = {
  FranchiseeId: number;
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

export const checkTokenExpiration = (token: string | null | undefined) => {
  if (token) {
    const parseToken = jwtDecode<jwtToken>(token);
    const currentTimestamp = new Date();
    const expireTime = new Date(0);
    expireTime.setUTCSeconds(parseToken.exp);
    return currentTimestamp > expireTime;
  } else {
    return true;
  }
};

export const getFranchiseeId = (token: string | null | undefined) => {
  if (token) {
    const parseToken = jwtDecode<jwtToken>(token);
    return parseToken.FranchiseeId;
  } else {
    return 0;
  }
};
