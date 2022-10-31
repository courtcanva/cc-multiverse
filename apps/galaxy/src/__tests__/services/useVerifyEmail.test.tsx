import { renderHook, act, waitFor } from "@testing-library/react";
import { useVerifyEmail } from "@src/services/verify-email/useVerifyEmail";
import { mockServer } from "@src/__tests__/mocks";

const mockPush = jest.fn();
jest.mock("next/router", () => ({
  useRouter: () => ({
    push: mockPush,
    query: mockPayload.valid,
  }),
}));

const realNextRoute = "/";
const mockPayload = {
  valid: {
    token: "valid",
    email: "email@email.com",
  },
  invalid: {
    token: "invalid",
    email: "email@email.com",
  },
};

describe("useVerifyEmail hook", () => {
  beforeAll(() => mockServer.listen());
  beforeEach(() => {
    mockServer.resetHandlers();
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
  afterAll(() => mockServer.close());

  it("should set status to success", async () => {
    const { result } = renderHook(() => useVerifyEmail());

    act(() => {
      result.current.verifyEmail(mockPayload.valid);
    });
    jest.runAllTimers();

    await waitFor(() => expect(result.current.status).toBe("success"));
  });

  it("should set verification status to fail", async () => {
    const { result } = renderHook(() => useVerifyEmail());

    act(() => {
      result.current.verifyEmail(mockPayload.invalid);
    });

    await waitFor(() => expect(result.current.status).toBe("fail"));
  });

  it("should execute action when verification is successfule", async () => {
    const { result } = renderHook(() => useVerifyEmail());

    act(() => {
      // These lines exists here because `action` is an optional property of verificationInfos[key].
      // Given `action` is optional, ts will prompt `Cannot invoke an object which is possibly 'undefined'.` error.
      // But in the context of `verificationInfos.success`, action will definitely not be `undefined` (because I wrote this).
      // Hence the below lines.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      result.current.verificationInfos?.success?.action();
    });

    expect(mockPush).toHaveBeenCalledWith(realNextRoute);
  });
});
