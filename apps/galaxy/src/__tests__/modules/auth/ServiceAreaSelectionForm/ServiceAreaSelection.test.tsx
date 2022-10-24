import customAxios from "../../../../services/utils/axios";
import MockAdapter from "axios-mock-adapter";
import React from "react";
import user from "@testing-library/user-event";
import renderWithMockedProvider from "../../../testHelper";
import { renderHook, screen, waitFor } from "@testing-library/react";
import ServiceAreaSelection from "../../../../pages/service-area-selection";
import useServiceArea from "../../../../services/servicearea/useServiceArea";
import { act } from "react-dom/test-utils";
import Select from "react-select";
import { render } from "@testing-library/react";
import selectEvent from "react-select-event";
import axios from "axios";

describe("Service Area Selection Page", () => {
  const mockedOptions = {
    filterMode: "INCLUDE",
    suburbs: [{ value: 11344, label: "East Albury NSW, 2640" }],
  };

  const mockedSelection = [{ sscCode: 11344 }];

  beforeAll(() => {
    mock.reset();
  });

  it("should render service area selection page success", () => {
    renderWithMockedProvider(<ServiceAreaSelection />);
    expect(screen.getByText("CourtCanva")).toBeInTheDocument();
    expect(screen.getByText("Please select and confirm your service area")).toBeInTheDocument();
  });

  it("should show warning when selection is empty", async () => {
    renderWithMockedProvider(<ServiceAreaSelection />);
    const submitBtn = screen.getByText("Submit");
    user.click(submitBtn);
    expect(await screen.findByText("Please select at least one suburb")).toBeVisible();
  });

  const mock = new MockAdapter(customAxios, { onNoMatch: "throwException" });

  it("should call service area selection in success", async () => {
    mock.onPost("/franchisee/1/service_areas", mockedSelection).reply(200);
    const { result } = renderHook(() => useServiceArea());

    act(() => {
      result.current.handleServiceAreaSubmit(mockedOptions);
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it("should call service area selection in failed", async () => {
    renderWithMockedProvider(<ServiceAreaSelection />);
    mock.onPost("/franchisee/1/service_areas", mockedSelection).reply(400);
    const { result } = renderHook(() => useServiceArea());
    act(() => {
      result.current.handleServiceAreaSubmit(mockedOptions);
    });
    await waitFor(() => expect(result.current.isLoading).toBe(true));
    expect(await screen.findByRole("status")).toBeInTheDocument();
  });

  it("should call suburbs api in success", async () => {
    renderWithMockedProvider(<ServiceAreaSelection />);
    mock.onGet("/suburbs").reply(200);

    expect(
      await screen.findAllByPlaceholderText("Please input your address or suburb")
    ).toHaveBeenCalled();
  });

  it("should show react select", async () => {
    renderWithMockedProvider(<ServiceAreaSelection />);
    expect(screen.getByPlaceholderText("Please input your address or suburb")).toHaveFormValues({
      suburbs: "",
    });

    await selectEvent.select(screen.getByLabelText("Search Area"), [
      "East Albury NSW, 2640",
      "Lavington NSW, 2641",
    ]);
    expect(screen.getByLabelText("Search Area")).toHaveFormValues({
      suburbs: [{ sscCode: 11344 }, { sscCode: 12287 }],
    });
  });
});
