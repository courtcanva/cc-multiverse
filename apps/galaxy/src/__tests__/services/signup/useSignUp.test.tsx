import axios from "@src/services/utils/axios";
import MockAdapter from "axios-mock-adapter";
import { renderHook } from "@testing-library/react";
import useSignUp from "@src/services/signup/useSignUp";

const mockAxios = new MockAdapter(axios, { onNoMatch: "throwException" });

describe("Sign Up Page", () => {
  const mockRegisterData = {
    username: "Atester@gmail.com",
    password: "Azxc123123",
    confirmPassword: "Azxc123123",
    businessName: "Test Business Name",
    legalEntityName: "Test Business Pty Ltd",
    abn: "12345678909",
    contactNumber: "0411111111",
    businessAddress: "23 testing St, Mel",
    companyPostcode: "1234",
    companyState: "VIC",
    firstName: "First",
    lastName: "Last",
    phoneNumber: "0422222222",
    residentialAddress: "34 testing St, Mel",
    residentialPostcode: "1235",
    residentialState: "NSW",
  };

  beforeAll(() => mockAxios.reset());
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("should toast success message and route to /sign-in when response status is 201", async () => {
    const mockToast = jest.fn();
    const mockPush = jest.fn();

    mockAxios
      .onPost("/franchisee/signup")
      .reply(201, { data: "your paylod" }, { authorization: "jwt token" });
    const { result } = renderHook(() => useSignUp());

    result.current.signUp(mockRegisterData);

    expect(mockToast).toHaveBeenCalledWith({
      title: "Registration completed successfully!",
      description: "Please check your registered email for email verification",
      status: "info",
      duration: 6000,
      position: "top",
      isClosable: true,
    });
    expect(mockPush).toHaveBeenCalledWith("/sign-in");
  });
  // it.skip("should toast error with message of duplicate user when response status is 400", async () => {});
  // it.skip("should toast error with message of service not response when response status is 4xx", async () => {});
});
