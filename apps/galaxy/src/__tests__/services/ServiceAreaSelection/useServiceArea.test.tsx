import React from "react";
import renderWithMockedProvider from "../../testHelper";
import { renderHook, waitFor } from "@testing-library/react";
import customAxios from "../../../services/utils/axios";
import MockAdapter from "axios-mock-adapter";
import useServiceArea from "@src/services/servicearea/useServiceArea";
import { act } from "react-dom/test-utils";
import ServiceAreaSelection from "@src/pages/service-area-selection";
import { getFranchiseeId } from "@src/utils/tokenService";
import Router from "next/router";

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

const mockToast = jest.fn();
jest.mock("@cc/ui-chakra", () => ({
  useToast: () => mockToast,
}));

describe("useServiceArea hook", () => {
  beforeAll(() => mockAxios.reset());
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("should get suburb info in success", async () => {
    renderWithMockedProvider(<ServiceAreaSelection />);
    mockAxios.onGet("/suburbs").reply(200);
    const { result } = renderHook(() => useServiceArea());
    await waitFor(() => expect(result.current.options.length).toBe(0));
  });

  it("should submit service area form in success", async () => {
    mockAxios.onPost("/franchisee/1111/service_areas", serviceAreaPayLoad).reply(200);
    const { result } = renderHook(() => useServiceArea());
    act(() => {
      result.current.handleServiceAreaSubmit(serviceAreaPayLoad);
    });
    await waitFor(() =>
      expect(mockToast).toHaveBeenCalledWith({
        title: "Submit Successfully",
        status: "info",
        duration: 6000,
        position: "top",
        isClosable: true,
      })
    );
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    // expect(Router.push).toHaveBeenCalledWith("/");
  });

  it("should submit service area form in fail", async () => {
    mockAxios.onPost("/franchisee/1111/service_areas", serviceAreaPayLoad).reply(401);
    const { result } = renderHook(() => useServiceArea());
    act(() => {
      result.current.handleServiceAreaSubmit(serviceAreaPayLoad);
    });

    await waitFor(() =>
      expect(mockToast).toHaveBeenCalledWith({
        title: "Submit Service Area Failed",
        description: "Service not response",
        status: "error",
        duration: 6000,
        position: "top",
        isClosable: true,
      })
    );
    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });
  it("should submit service area form in forbidden", async () => {
    mockAxios.onPost("/franchisee/1111/service_areas", serviceAreaPayLoad).reply(403);
    const { result } = renderHook(() => useServiceArea());
    act(() => {
      result.current.handleServiceAreaSubmit(serviceAreaPayLoad);
    });

    await waitFor(() =>
      expect(mockToast).toHaveBeenCalledWith({
        title: "Authorization error",
        description: "Username and password is not authenticated",
        status: "error",
        duration: 6000,
        position: "top",
        isClosable: true,
      })
    );
    await waitFor(() => expect(result.current.isLoading).toBe(false));
  });
});
