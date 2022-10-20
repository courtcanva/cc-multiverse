import useToken from "../../utils/tokenService";

const localStorageMock = (function () {
  const store: { [x: string]: string } = {};

  return {
    getItem(key: string) {
      return store[key];
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    removeItem(key: string) {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });
// eslint-disable-next-line react-hooks/rules-of-hooks
const { setToken, getToken, checkTokenExpiration } = useToken();

it("should store accessToken to localStorage", () => {
  setToken("accessToken");
  expect(localStorage.getItem("accessToken")).toEqual("accessToken");
});

it("should able to get accessToken from localStorage", () => {
  getToken();
  expect(localStorage.getItem("accessToken")).toEqual(getToken());
});

it("should token be checked as expired", () => {
  const pastToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmc2RhQGdtYWlsLmNvbSIsImF1dGhvcml0aWVzIjpbeyJhdXRob3JpdHkiOiJTVEFGRiJ9XSwiU3RhZmZJZCI6MSwiaWF0IjoxNjY2MjIyOTE5LCJleHAiOjE2MzY1NzU2MzB9.ZuIEKHK1LXXcriPhK1StasuNI35nADRl3C9BsGuy8Ss";
  setToken(pastToken);
  expect(checkTokenExpiration()).toBe(true);
});
