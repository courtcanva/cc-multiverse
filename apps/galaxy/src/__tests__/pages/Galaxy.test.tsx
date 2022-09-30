import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";
import Galaxy from "../../pages";

describe("page/Galaxy", () => {
  beforeAll(() => {
    console.log = jest.fn();
  });

  it("should render galaxy page correctly", async () => {
    render(<Galaxy />);

    user.click(screen.getByText("To Galaxy... and Beyong!!"));

    await waitFor(() => {
      expect(console.log).toHaveBeenCalledWith("Welcome to galaxy");
    });

    expect(screen.getByText("Galaxy")).toBeInTheDocument();
  });
});
