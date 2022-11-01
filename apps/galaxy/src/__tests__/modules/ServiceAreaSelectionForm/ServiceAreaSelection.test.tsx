import customAxios from "../../../services/utils/axios";
import MockAdapter from "axios-mock-adapter";
import React from "react";
import user from "@testing-library/user-event";
import renderWithMockedProvider from "../../testHelper";
import { screen, waitFor } from "@testing-library/react";
import ServiceAreaSelection from "../../../pages/service-area-selection";

const mockedOptions = [{ value: 11344, label: "East Albury NSW, 2640" }];
const mockAxios = new MockAdapter(customAxios, { onNoMatch: "throwException" });

const handleServiceAreaSubmit = jest.fn();
jest.mock("../../../services/servicearea/useServiceArea.ts", () => {
  return () => ({
    isLoading: false,
    handleServiceAreaSubmit,
    options: mockedOptions,
  });
});

const mockPush = jest.fn();
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("Service Area Selection Page", () => {
  beforeAll(() => {
    mockAxios.reset();
  });

  it("should render service area selection page success", async () => {
    renderWithMockedProvider(<ServiceAreaSelection />);
    expect(screen.getByText("CourtCanva")).toBeInTheDocument();
    expect(screen.getByText("Please select and confirm your service area")).toBeInTheDocument();
  });

  it("should show error message", async () => {
    renderWithMockedProvider(<ServiceAreaSelection />);
    const submitBtn = screen.getByRole("button", { name: /Submit/i });
    user.click(submitBtn);

    expect(await screen.findByText("Please select at least one option")).toBeVisible();
  });

  it("should handle input change", async () => {
    renderWithMockedProvider(<ServiceAreaSelection />);
    const suburbInput = screen.getByRole("combobox", { name: "" });
    user.type(suburbInput, "E");
    expect(await screen.findByText("East Albury NSW, 2640")).toBeInTheDocument();

    user.type(suburbInput, "{backspace}");
    await waitFor(() =>
      expect(screen.queryByText("East Albury NSW, 2640")).not.toBeInTheDocument()
    );
  });
});
