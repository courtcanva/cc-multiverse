import { setToken, getToken, checkTokenExpiration } from "../../utils/tokenService";

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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE5MjA1NzI0MzB9.Vv0RJ2JwqbMx3eyheKeJVEbfosJcApQPAon29ollGms";
  setToken(pastToken);
  expect(checkTokenExpiration(pastToken)).toBe(false);
  expect(checkTokenExpiration(undefined)).toBe(true);
});
