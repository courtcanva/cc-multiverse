import axios from "@src/services/utils/axios";
import MockAdapter from "axios-mock-adapter";
import { renderHook, waitFor } from "@testing-library/react";
import useSignUp from "@src/services/signup/useSignUp";
import { act } from "react-dom/test-utils";

const mockAxios = new MockAdapter(axios, { onNoMatch: "throwException" });
const mockToast = jest.fn();
jest.mock("@cc/ui-chakra", () => ({
  useToast: () => mockToast,
}));
const mockPush = jest.fn();
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("Sign Up Page", () => {
  const mockSignUpFormData: SignUpFormData = {
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
  const mockSignUpPaylod = {
    franchiseePostDto: {
      businessName: "Test Business Name",
      legalEntityName: "Test Business Pty Ltd",
      abn: "12345678909",
      contactNumber: "0411111111",
      businessAddress: "23 testing St, Mel",
      companyPostcode: "1234",
      state: "VIC",
    },
    staffPostDto: {
      email: "Atester@gmail.com",
      password: "Azxc123123",
      firstName: "First",
      lastName: "Last",
      phoneNumber: "0422222222",
      residentialAddress: "34 testing St, Mel",
      residentialPostcode: "1235",
      state: "NSW",
    },
  };

  beforeAll(() => mockAxios.reset());

  it("should toast success message and route to /sign-in when response status is 201", async () => {
    mockAxios.onPost("/franchisee/signup", mockSignUpPaylod).reply(201);
    const { result } = renderHook(() => useSignUp());

    act(() => {
      result.current.signUp(mockSignUpFormData);
    });

    await waitFor(() =>
      expect(mockToast).toHaveBeenCalledWith({
        title: "Registration completed successfully!",
        description: "Please check your registered email for email verification",
        status: "info",
        duration: 6000,
        position: "top",
        isClosable: true,
      })
    );
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(mockPush).toHaveBeenCalledWith("/sign-in");
  });

  it("should toast error with message of duplicate user when response status is 400", async () => {
    mockAxios.onPost("/franchisee/signup", mockSignUpPaylod).reply(400);
    const { result } = renderHook(() => useSignUp());

    act(() => {
      result.current.signUp(mockSignUpFormData);
    });

    await waitFor(() =>
      expect(mockToast).toHaveBeenCalledWith({
        title: "Sign up failed",
        description: "Duplicated user",
        status: "error",
        duration: 6000,
        position: "top",
        isClosable: true,
      })
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it("should toast error with message of service not response when response status is 4xx", async () => {
    mockAxios.onPost("/franchisee/signup", mockSignUpPaylod).reply(401);
    const { result } = renderHook(() => useSignUp());

    act(() => {
      result.current.signUp(mockSignUpFormData);
    });

    await waitFor(() =>
      expect(mockToast).toHaveBeenCalledWith({
        title: "Sign up failed",
        description: "Service not response",
        status: "error",
        duration: 6000,
        position: "top",
        isClosable: true,
      })
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it("should get true value of is response status is 200", async () => {
    mockAxios.onGet("/staff/emails/Atester@gmail.com").reply(200);
    const { result } = renderHook(() => useSignUp());
    let isEmailExists: boolean;
    await act(async () => {
      isEmailExists = await result.current.checkEmailIsExists(mockSignUpFormData.username);
    });

    await waitFor(() => expect(isEmailExists).toBe(false));
  });

  it("should toast error with message of service not response when response status is 409", async () => {
    mockAxios.onGet("/staff/emails/Atester@gmail.com").reply(409);
    const { result } = renderHook(() => useSignUp());
    await act(async () => {
      await result.current.checkEmailIsExists(mockSignUpFormData.username);
    });

    await waitFor(() =>
      expect(mockToast).toHaveBeenCalledWith({
        title: "That email has been used",
        description: "That username is taken. Try another.",
        status: "error",
        duration: 6000,
        position: "top",
        isClosable: true,
      })
    );
  });
});
