import customAxios from "@src/services/utils/axios";
import MockAdapter from "axios-mock-adapter";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useVerifyEmail } from "@src/services/verify-email/useVerifyEmail";

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));
const mockAxios = new MockAdapter(customAxios, { onNoMatch: "throwException" });

const verifyEmailPayload = {
  token: "token",
  email: "email@email.com",
};

describe("useVerifyEmail hook should", () => {
  beforeAll(() => mockAxios.reset());
  beforeEach(() => jest.useFakeTimers());
  afterEach(() => jest.useRealTimers());

  it("set status to success", async () => {
    mockAxios.onPost("/staff/verify", verifyEmailPayload).reply(202);
    const { result } = renderHook(() => useVerifyEmail());

    act(() => {
      result.current.verifyEmail(verifyEmailPayload);
    });

    await waitFor(() => expect(result.current.status).toBe("success"));
  });

  it("set verification status to fail", async () => {
    mockAxios.onPost("/staff/verify", verifyEmailPayload).reply(401);
    const { result } = renderHook(() => useVerifyEmail());

    act(() => {
      result.current.verifyEmail(verifyEmailPayload);
    });

    await waitFor(() => expect(result.current.status).toBe("fail"));
  });

  it("route to next page when action is called after verification success", async () => {
    mockAxios.onPost("/staff/verify", verifyEmailPayload).reply(202);
    const { result } = renderHook(() => useVerifyEmail());

    act(() => {
      result.current.verifyEmail(verifyEmailPayload);
    });
    await waitFor(() => expect(result.current.status).toBe("success"));
  });
});
