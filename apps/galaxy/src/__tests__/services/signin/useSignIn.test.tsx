import React from "react";
import renderWithMockedProvider from "../../testHelper";
import user from "@testing-library/user-event";
import { renderHook, screen, waitFor } from "@testing-library/react";
import SignIn from "../../../pages/sign-in";
import customAxios from "../../../services/utils/axios";
import MockAdapter from "axios-mock-adapter";
import userSignIn from "../../../services/signin/useSignIn";
import { act } from "react-dom/test-utils";

const mock = new MockAdapter(customAxios, { onNoMatch: "throwException" });

describe("Sign in Page", () => {
  const account = { username: "vvv@v.com", password: "123qweASD=" };

  beforeAll(() => {
    mock.reset();
  });

  it("should form submit", async () => {
    renderWithMockedProvider(<SignIn />);
    const submitBtn = screen.getByRole("button", { name: /Sign In/i });
    const usernameInput = screen.getByPlaceholderText("Enter username");
    const passwordInput = screen.getByPlaceholderText("Enter password");
    await user.type(usernameInput, account.username);
    await user.type(passwordInput, account.password);
    user.click(submitBtn);
    expect(await screen.findByRole("status")).toBeInTheDocument();
  });

  it("should call sign in success", async () => {
    renderWithMockedProvider(<SignIn />);
    mock.onPost("/staff/signin", account).reply(200, account, {
      authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE5MjA1NzI0MzB9.Vv0RJ2JwqbMx3eyheKeJVEbfosJcApQPAon29ollGms",
    });
    const { result } = renderHook(() => userSignIn());

    act(() => {
      result.current.handleSignInSubmit(account);
    });

    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it("should call sign in failed", async () => {
    renderWithMockedProvider(<SignIn />);
    mock.onPost("/staff/signin", account).reply(401, account);
    const { result } = renderHook(() => userSignIn());

    act(() => {
      result.current.handleSignInSubmit(account);
    });
    await waitFor(() => expect(result.current.isLoading).toBe(true));
    expect(await screen.findByRole("status")).toBeInTheDocument();
  });
});
