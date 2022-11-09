import React from "react";
import renderWithMockedProvider from "@src/__tests__/testHelper";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";
import MockAdapter from "axios-mock-adapter";
import axios from "@src/services/utils/axios";
import SignUp from "@src/pages/sign-up";

const mockAxios = new MockAdapter(axios, { onNoMatch: "throwException" });
describe("SignUp", () => {
  jest.setTimeout(100000);

  it("should render the step 1 register information of sign up page successfully", async () => {
    renderWithMockedProvider(<SignUp />);
    expect(screen.getByText("CourtCanva")).toBeInTheDocument();
    expect(screen.getByText("Register with CourtCanva as our franchisee")).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /step 1/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /step 2/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /step 3/i })).toBeInTheDocument();
  });

  it("should navigate to the login page when click on the link", async () => {
    renderWithMockedProvider(<SignUp />);
    expect(screen.getByRole("link", { name: /login here\./i })).toHaveAttribute("href", "/sign-in");
  });

  it("should sign up succesfully when all input value is valid", async () => {
    mockAxios.onGet("/staff/emails/tester@gmail.com").reply(200);
    renderWithMockedProvider(<SignUp />);
    const emailInput = screen.getByPlaceholderText("Enter email");
    const passwordInput = screen.getByPlaceholderText("Enter password");
    const confirmPasswordInput = screen.getByPlaceholderText("Please Confirm your password");
    expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
    await userEvent.type(emailInput, "tester@gmail.com");
    await userEvent.type(passwordInput, "Azxc123123");
    await userEvent.type(confirmPasswordInput, "Azxc123123");
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(screen.getByRole("button", { name: /next/i })).toHaveProperty("disabled", false);
    await userEvent.dblClick(screen.getByRole("button", { name: /next/i }));
    const businessNameInput = screen.getByPlaceholderText("Enter business name");
    const legalNameInput = screen.getByPlaceholderText("Enter legal name");
    const abnInput = screen.getByPlaceholderText("Enter ABN number");
    const contactNumberInput = screen.getByPlaceholderText("Enter contact number");
    const companyStateSelect = screen.getByRole("combobox");
    const companyPostCodeInput = screen.getByPlaceholderText("Enter postcode");
    const companyAddressInput = screen.getByPlaceholderText("Enter your business address");
    expect(screen.getByText("Please Fill in your company information details")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
    await userEvent.type(businessNameInput, "tester Industry");
    await userEvent.type(legalNameInput, "tester Industry Pty Ltd");
    await userEvent.type(abnInput, "12345678900");
    await userEvent.type(contactNumberInput, "0434111111");
    await userEvent.selectOptions(companyStateSelect, screen.getByRole("option", { name: "NSW" }));
    expect(companyStateSelect).toHaveValue("NSW");
    await userEvent.type(companyPostCodeInput, "2000");
    await userEvent.type(companyAddressInput, "170 George St, SYD");
    await userEvent.click(screen.getByRole("button", { name: /next/i }));
    expect(screen.getByRole("button", { name: /next/i })).toHaveProperty("disabled", false);
    await userEvent.dblClick(screen.getByRole("button", { name: /next/i }));
    expect(screen.getByText("Please fill in your personal information")).toBeInTheDocument();
    const firstNameInput = screen.getByPlaceholderText("Enter your first name");
    const lastNameInput = screen.getByPlaceholderText("Enter your last name");
    const phoneNumberInput = screen.getByPlaceholderText("Enter your phone number");
    const residentialStateSelect = screen.getByRole("combobox");
    const residentialPostcodeInput = screen.getByPlaceholderText("Enter postcode");
    const residentialAddressInput = screen.getByPlaceholderText("Enter your address");
    await userEvent.type(firstNameInput, "tester");
    await userEvent.type(lastNameInput, "Miao");
    await userEvent.type(phoneNumberInput, "0434111111");
    await userEvent.selectOptions(
      residentialStateSelect,
      screen.getByRole("option", { name: "NSW" })
    );
    expect(companyStateSelect).toHaveValue("NSW");
    await userEvent.type(residentialPostcodeInput, "2000");
    await userEvent.type(residentialAddressInput, "170 George St, SYD");
    await userEvent.dblClick(screen.getByRole("button", { name: /submit/i }));
  });
});
