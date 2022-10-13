import React from "react";
import renderWithMockedProvider from "../../../testHelper";
import user from "@testing-library/user-event";
import { renderHook, screen, waitFor } from "@testing-library/react";
import SignIn from "../../../../pages/sign-in";
import customAxios from "../../../../services/utils/axios";
import MockAdapter from "axios-mock-adapter";
import userSignIn from "../../../../services/signin/useSignIn";
import { act } from "react-dom/test-utils";

describe("Sign in Page", () => {
  const account = { username: "vvv@v.com", password: "123qweASD=" };

  beforeAll(() => {
    mock.reset();
  });

  it("should render personal sign in page success", () => {
    renderWithMockedProvider(<SignIn />);
    expect(screen.getByText("CourtCanva")).toBeInTheDocument();
    expect(screen.getByText("Sign in to CourtCanva Franchisee")).toBeInTheDocument();
  });

  it("should form submit", async () => {
    renderWithMockedProvider(<SignIn />);
    const submitBtn = screen.getByText("Sign In");
    const usernameInput = screen.getByRole("email");
    const passwordInput = screen.getByRole("password");
    await user.type(usernameInput, account.username);
    await user.type(passwordInput, account.password);
    user.click(submitBtn);
    expect(await screen.findByRole("status")).toBeInTheDocument();
  });

  const mock = new MockAdapter(customAxios, { onNoMatch: "throwException" });

  it("should call sign in success", async () => {
    mock.onPost("/staff/signin", account).reply(200, account);
    const { result } = renderHook(() => userSignIn());

    act(() => {
      result.current.handleSignInSubmit(account);
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it("should call sign in failed", async () => {
    renderWithMockedProvider(<SignIn />);
    mock.onPost("/staff/signin", account).reply(400, account);
    const { result } = renderHook(() => userSignIn());

    act(() => {
      result.current.handleSignInSubmit(account);
    });
    await waitFor(() => expect(result.current.isLoading).toBe(true));
    expect(await screen.findByRole("status")).toBeInTheDocument();
  });
});
