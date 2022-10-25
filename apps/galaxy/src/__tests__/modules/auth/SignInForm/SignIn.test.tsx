import React from "react";
import renderWithMockedProvider from "../../../testHelper";
import { screen } from "@testing-library/react";
import SignIn from "../../../../pages/sign-in";

describe("Sign in Page", () => {
  it("should render personal sign in page success", () => {
    renderWithMockedProvider(<SignIn />);
    expect(screen.getByText("CourtCanva")).toBeInTheDocument();
    expect(screen.getByText("Sign in to CourtCanva Franchisee")).toBeInTheDocument();
  });
});
