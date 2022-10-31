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

  describe("On step 1, the register page", () => {
    it("should render the step 1 register information of sign up page successfully", async () => {
      renderWithMockedProvider(<SignUp />);
      expect(screen.getByText("CourtCanva")).toBeInTheDocument();
      expect(screen.getByText("Register with CourtCanva as our franchisee")).toBeInTheDocument();
      expect(screen.getByText("Step 1")).toBeInTheDocument();
      expect(screen.getByText("Step 2")).toBeInTheDocument();
      expect(screen.getByText("Step 3")).toBeInTheDocument();
    });

    it("should display required error when username value is blank", async () => {
      renderWithMockedProvider(<SignUp />);
      userEvent.click(screen.getByTestId("Email"));
      userEvent.click(screen.getByTestId("Password"));
      expect(await screen.findAllByRole("error")).toHaveLength(1);
    });

    it("should display matching error when email is invalid", async () => {
      renderWithMockedProvider(<SignUp />);
      userEvent.type(screen.getByTestId("Email"), "invaildemail");
      userEvent.click(screen.getByTestId("Password"));
      expect(await screen.findAllByRole("error")).toHaveLength(1);
    });

    it("should display required error when password value is blank", async () => {
      renderWithMockedProvider(<SignUp />);
      userEvent.click(screen.getByTestId("Password"));
      userEvent.click(screen.getByTestId("Confirm Password"));
      expect(await screen.findAllByRole("error")).toHaveLength(1);
    });

    it("should display matching error when password is invalid", async () => {
      renderWithMockedProvider(<SignUp />);
      userEvent.type(screen.getByTestId("Password"), "ainvalidpassword");
      userEvent.click(screen.getByTestId("Confirm Password"));
      expect(await screen.findAllByRole("error")).toHaveLength(1);
    });

    it("should display required error when confirm password value is blank", async () => {
      renderWithMockedProvider(<SignUp />);
      userEvent.click(screen.getByTestId("Confirm Password"));
      userEvent.click(screen.getByTestId("Password"));
      expect(await screen.findAllByRole("error")).toHaveLength(1);
    });

    it("should display matching error when confirm password is not match", async () => {
      renderWithMockedProvider(<SignUp />);
      userEvent.type(screen.getByTestId("Password"), "Avalidpassword1");
      userEvent.type(screen.getByTestId("Confirm Password"), "ainvalidpassword");
      userEvent.click(screen.getByTestId("Password"));
      expect(await screen.findAllByRole("error")).toHaveLength(1);
    });

    it("should display the company info page when all input is vaild after click the next button", async () => {
      renderWithMockedProvider(<SignUp />);
      userEvent.type(screen.getByTestId("Email"), "tester@gmail.com");
      userEvent.type(screen.getByTestId("Password"), "Azxc123123");
      userEvent.type(screen.getByTestId("Confirm Password"), "Azxc123123");
      userEvent.dblClick(screen.getByTestId("step1NextBtn"));
      expect(screen.getByTestId("step1NextBtn")).toBeEnabled();
    });
  });
});
