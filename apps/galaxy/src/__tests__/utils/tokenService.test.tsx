import jwtDecode from "jwt-decode";
import {
  setToken,
  getToken,
  checkTokenExpiration,
  getFranchiseeId,
  jwtToken,
} from "../../utils/tokenService";

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

it("should decode franchisee id from token", () => {
  const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyM3NkZEBnbWFpbC5jb20iLCJhdXRob3JpdGllcyI6W3siYXV0aG9yaXR5IjoiU1RBRkYifV0sIlN0YWZmSWQiOjEsIkZyYW5jaGlzZWVJZCI6MSwiaWF0IjoxNjY3MDI4NjU2LCJleHAiOjE2NjcwNDg0MDB9.RtbJLLZVdcfqi2Vbdl7MTUqsF9dzM5j2op2I9xAoqL5zu6hGzAISgXXSNYMeY72TlBJOdQ8k831oFIWgT7ZXjQ";

  const parseToken = jwtDecode<jwtToken>(token);
  expect(getFranchiseeId(token)).toBe(parseToken.FranchiseeId);
});

it("should return true when token is null", () => {
  expect(getFranchiseeId(null)).toBe(true);
});
