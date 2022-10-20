export default function tokenService() {
  const setToken = (token: string) => {
    localStorage.setItem("accessToken", token);
  };

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("accessToken");
    }
  };

  const checkTokenExpiration = () => {
    const token = getToken();
    const utcTimestamp = new Date();
    return utcTimestamp > parseJwtToken(token as string);
  };

  function parseJwtToken(token: string) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    const exp = new Date(0);
    exp.setUTCSeconds(JSON.parse(jsonPayload).exp);
    return exp;
  }

  return { setToken, getToken, checkTokenExpiration };
}
