import customAxios from "../../../services/utils/axios";
import MockAdapter from "axios-mock-adapter";
import React from "react";
import user from "@testing-library/user-event";
import renderWithMockedProvider from "../../testHelper";
import { renderHook, screen, waitFor } from "@testing-library/react";
import ServiceAreaSelection from "../../../pages/service-area-selection";
import useServiceArea from "../../../services/servicearea/useServiceArea";
import { act } from "react-dom/test-utils";
import Select from "react-select";
import { render } from "@testing-library/react";
import selectEvent from "react-select-event";

const mockAction = jest.fn();
const mockedOptions = {
  suburbs: [{ value: 11344, label: "East Albury NSW, 2640" }],
};
const mockedSelection = [{ suburb: "Glenroy NSW" }];
const mockAxios = new MockAdapter(customAxios, { onNoMatch: "throwException" });

jest.mock("../../services/ServiceAreaSelection/useServiceArea.test.tsx", () => {
  return {
    useServiceArea: () => ({}),
  };
});

describe("Service Area Selection Page", () => {
  beforeAll(() => {
    mockAxios.reset();
  });

  it("should render service area selection page success", () => {
    renderWithMockedProvider(<ServiceAreaSelection />);
    expect(screen.getByText("CourtCanva")).toBeInTheDocument();
    expect(screen.getByText("Please select and confirm your service area")).toBeInTheDocument();
  });

  it("should show error message", async () => {
    renderWithMockedProvider(<ServiceAreaSelection />);
    const submitBtn = screen.getByRole("button", { name: /Submit/i });
    user.click(submitBtn);
    await waitFor(() =>
      expect(screen.getByText("Please select at least one option")).toBeVisible()
    );
  });
});
