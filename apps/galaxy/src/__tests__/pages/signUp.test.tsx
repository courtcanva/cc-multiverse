import React from "react";
import renderWithMockedProvider from "../testHelper";
import userEvent from "@testing-library/user-event";
import { renderHook, screen, waitFor, fireEvent } from "@testing-library/react";
import SignUp from "../../pages/sign-up";
import MockAdapter from "axios-mock-adapter";
import userSignUp from "../../services/signup/useSignUp";
import { act } from "react-dom/test-utils";
import { render } from "react-dom";

const mockRegisterInfoData = jest.fn((username, password, confirmPassword) => {
  return Promise.resolve({ username, password, confirmPassword });
});

describe("SignUp", () => {
  const mockOnSubmit = jest.fn();

  it("should render the step 1 register information of sign up page successfully", async () => {
    renderWithMockedProvider(<SignUp />);
    expect(screen.getByText("CourtCanva")).toBeInTheDocument();
    expect(screen.getByText("Register with CourtCanva as our franchisee")).toBeInTheDocument();
    expect(screen.getByText("Step 1")).toBeInTheDocument();
    expect(screen.getByText("Step 2")).toBeInTheDocument();
    expect(screen.getByText("Step 3")).toBeInTheDocument();
  });
});
