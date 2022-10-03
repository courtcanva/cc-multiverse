import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Startrek from "@src/pages";

describe("page/Galaxy", () => {
  beforeAll(() => {
    console.log = jest.fn();
  });

  it("should render galaxy page correctly", async () => {
    render(<Startrek />);

    await userEvent.click(screen.getByText("Get Started 🥳"));
    expect(console.log).toHaveBeenCalledWith("Get Started 🥳");

    expect(
      screen.getByText(
        "Master Java Coding! This course requires no previous programming or Java experience"
      )
    ).toBeInTheDocument();
  });
});
