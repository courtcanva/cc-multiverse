import React from "react";
import renderWithMockedProvider from "../../testHelper";
import { renderHook, waitFor } from "@testing-library/react";
import customAxios from "../../../services/utils/axios";
import MockAdapter from "axios-mock-adapter";
import useServiceArea from "@src/services/servicearea/useServiceArea";
import { act } from "react-dom/test-utils";
import ServiceAreaSelection from "@src/pages/service-area-selection";

const mockAxios = new MockAdapter(customAxios, { onNoMatch: "throwException" });

const serviceAreaPayLoad = {
  filterMode: "INCLUDE",
  suburbs: [{ value: 11344, label: "East Albury NSW, 2640" }],
};

const mockPush = jest.fn();
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("useServiceArea hook", () => {
  beforeAll(() => mockAxios.reset());
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("should submit service area form in success", async () => {
    mockAxios.onPost("/franchisee/1/service_areas", serviceAreaPayLoad).reply(200);
    const { result } = renderHook(() => useServiceArea());

    act(() => {
      result.current.handleServiceAreaSubmit(serviceAreaPayLoad);
    });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });

  it("should submit service area form in fail", async () => {
    mockAxios.onPost("/franchisee/1/service_areas", serviceAreaPayLoad).reply(401);
    const { result } = renderHook(() => useServiceArea());
    act(() => {
      result.current.handleServiceAreaSubmit(serviceAreaPayLoad);
    });
    await waitFor(() => expect(result.current.isLoading).toBe(true));
  });

  it("should get suburb info in success", async () => {
    renderWithMockedProvider(<ServiceAreaSelection />);
    mockAxios.onGet("/suburbs").reply(200);
    const { result } = renderHook(() => useServiceArea());
    await waitFor(() => expect(result.current.options.length).toBe(0));
  });
});
