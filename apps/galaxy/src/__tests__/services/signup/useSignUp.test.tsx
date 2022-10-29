import React from "react";
import axios from "@src/services/utils/axios";
import MockAdapter from "axios-mock-adapter";
import { renderHook, screen, waitFor } from "@testing-library/react";
import useSignUp from "@src/services/signup/useSignUp";
import renderWithMockedProvider from "../../testHelper";
// import user from "@testing-library/user-event";
import SignUp from "@src/pages/sign-up";
import { act } from "react-dom/test-utils";

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
    renderWithMockedProvider(<SignUp />);
    const mockToast = jest.fn();
    const mockPush = jest.fn();

    mockAxios.onPost("/franchisee/signup", mockRegisterData).reply(201, mockRegisterData, {
      authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE5MjA1NzI0MzB9.Vv0RJ2JwqbMx3eyheKeJVEbfosJcApQPAon29ollGms",
    });
    const { result } = renderHook(() => useSignUp());

    act(() => {
      result.current.signUp(mockRegisterData);
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
    renderWithMockedProvider(<SignUp />);
    const mockToast = jest.fn();

    mockAxios.onPost("/franchisee/signup", mockRegisterData).reply(400, mockRegisterData);
    const { result } = renderHook(() => useSignUp());

    act(() => {
      result.current.signUp(mockRegisterData);
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

    await waitFor(() => expect(result.current.isLoading).toBe(true));
    expect(await screen.findByRole("status")).toBeInTheDocument();
  });

  it("should toast error with message of service not response when response status is 4xx", async () => {
    renderWithMockedProvider(<SignUp />);
    const mockToast = jest.fn();

    mockAxios.onPost("/franchisee/signup", mockRegisterData).reply(400, mockRegisterData);
    const { result } = renderHook(() => useSignUp());

    act(() => {
      result.current.signUp(mockRegisterData);
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

    await waitFor(() => expect(result.current.isLoading).toBe(true));
    expect(await screen.findByRole("status")).toBeInTheDocument();
  });
});
