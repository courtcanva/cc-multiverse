import { render, screen } from "@testing-library/react";
import Galaxy from "../../pages";

describe("page/Galaxy", () => {
  it("should render galaxy page correctly", () => {
    render(<Galaxy />);
    expect(screen.getByText("Galaxy")).toBeInTheDocument();
  });
});
