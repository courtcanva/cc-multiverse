import React from "react";
import renderWithMockedProvider from "@src/__tests__/testHelper";
import { screen } from "@testing-library/react";
import SignIn from "@src/pages/sign-in";

describe("Sign in Page", () => {
  it("should render personal sign in page success", () => {
    renderWithMockedProvider(<SignIn />);
    expect(screen.getByText("CourtCanva")).toBeInTheDocument();
    expect(screen.getByText("Sign in to CourtCanva Franchisee")).toBeInTheDocument();
  });
});
