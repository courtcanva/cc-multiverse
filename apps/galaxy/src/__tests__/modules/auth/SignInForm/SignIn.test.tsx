import React from "react";
import renderWithMockedProvider from "@src/__tests__/testHelper";
import { screen } from "@testing-library/react";
import SignIn from "@src/pages/sign-in";
import userEvent from "@testing-library/user-event";

const mockPush = jest.fn();
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("Sign in Page", () => {
  it("should render personal sign in page success", () => {
    renderWithMockedProvider(<SignIn />);
    expect(screen.getByText("CourtCanva")).toBeInTheDocument();
    expect(screen.getByText("Sign in to CourtCanva Franchisee")).toBeInTheDocument();
  });

  it("should navigate to the login page", async () => {
    renderWithMockedProvider(<SignIn />);
    await userEvent.click(
      screen.getByRole("button", { name: /do not have an account\? register here\./i })
    );
    expect(mockPush).toHaveBeenCalledWith("/sign-up");
  });
});
