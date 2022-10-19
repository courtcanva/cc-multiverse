import useToken from "../../utils/useToken";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { setToken, getToken } = useToken();

it("should store userToken to localStorage", () => {
  setToken("accessToken");
  expect(localStorage.getItem("userToken")).toEqual("accessToken");
});

it("should able to get userToken from localStorage", () => {
  getToken();
  expect(localStorage.getItem("userToken")).toEqual(getToken());
});
