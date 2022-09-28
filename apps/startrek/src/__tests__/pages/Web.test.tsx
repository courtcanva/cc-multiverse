import { render, screen } from "@testing-library/react";
import Web from "../../pages";

describe("page/Galaxy", () => {
  it("should render galaxy page correctly", () => {
    render(<Web />);
    expect(
      screen.getByText(
        "Master Java Coding! This course requires no previous programming or Java experience"
      )
    ).toBeInTheDocument();
  });
});
