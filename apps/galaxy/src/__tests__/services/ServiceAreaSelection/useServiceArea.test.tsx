import { renderHook, waitFor } from "@testing-library/react";
import axios from "@src/services/utils/axios";
import MockAdapter from "axios-mock-adapter";
import useServiceArea from "@src/services/servicearea/useServiceArea";
import { act } from "react-dom/test-utils";

const mockAxios = new MockAdapter(axios, { onNoMatch: "throwException" });

const serviceAreaPayLoad = {
  filterMode: "INCLUDE",
  suburbs: [{ value: 11344, label: "East Albury NSW, 2640" }],
};

const serviceAreaSubmit = {
  filterMode: "INCLUDE",
  suburbs: [
    {
      sscCode: 11344,
    },
  ],
};

const suburbData = {
  suburbs: [
    {
      sscCode: 11344,
      suburbName: "East Albury",
      postcode: 2640,
      state: "NSW",
    },
  ],
};

const mockPush = jest.fn();
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: mockPush,
    query: { franchiseeId: 1 },
  }),
}));

const mockToast = jest.fn();
jest.mock("@cc/ui-chakra", () => ({
  useToast: () => mockToast,
}));

describe("useServiceArea hook", () => {
  beforeAll(() => mockAxios.reset());

  it("should get suburb info in success", async () => {
    mockAxios.onGet("/suburbs").reply(200, suburbData);
    const result = await axios.get("/suburbs");
    expect(result.data).toEqual(suburbData);
  });

  it("should get suburb info in fail", async () => {
    mockAxios.onGet("/suburbs").reply(500, suburbData);
    renderHook(() => useServiceArea());
    await waitFor(() =>
      expect(mockToast).toHaveBeenCalledWith({
        title: "Server Error",
        status: "error",
        duration: 6000,
        position: "top",
        isClosable: true,
      })
    );
  });

  it("should submit service area form in success", async () => {
    mockAxios.onGet("/suburbs").reply(200, suburbData);
    mockAxios
      .onPost("/franchisee/1/service_areas", serviceAreaSubmit)
      .reply(200, serviceAreaPayLoad);

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
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it("should submit service area form in fail", async () => {
    mockAxios.onGet("/suburbs").reply(200, suburbData);
    mockAxios
      .onPost("/franchisee/1/service_areas", serviceAreaSubmit)
      .reply(400, serviceAreaPayLoad);
    const { result } = renderHook(() => useServiceArea());
    act(() => {
      result.current.handleServiceAreaSubmit(serviceAreaPayLoad);
    });

    await waitFor(() =>
      expect(mockToast).toHaveBeenCalledWith({
        title: "Service Error",
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
    mockAxios.onGet("/suburbs").reply(200, suburbData);
    mockAxios
      .onPost("/franchisee/1/service_areas", serviceAreaSubmit)
      .reply(403, serviceAreaPayLoad);
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
