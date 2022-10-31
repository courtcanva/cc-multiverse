import { screen, waitFor } from "@testing-library/react";
import EmailVerificationPage from "@src/pages/staff/verify-email";
import renderWithMockedProvider from "../testHelper";

const mockAction = jest.fn();
const mockVerificationInfos = {
  test: {
    icon: { variant: "loading" },
    message: "Testing email verification",
    action: mockAction,
  },
};

jest.mock("next/router", () => ({
  useRouter: () => ({
    query: {
      token: "token",
      email: "email",
    },
  }),
}));

jest.mock("../../services/verify-email/useVerifyEmail", () => {
  return {
    useVerifyEmail: () => ({
      verificationInfos: mockVerificationInfos,
      status: "test",
      verifyEmail: jest.fn(),
    }),
  };
});

describe("Verify email page should", () => {
  it("show test verification info", async () => {
    renderWithMockedProvider(<EmailVerificationPage />);
    await waitFor(() => expect(screen.getByText(mockVerificationInfos.test.message)).toBeVisible());
    await waitFor(() => expect(screen.getByText(/continue/i)).toBeVisible());
  });
});
