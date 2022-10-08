import renderWithMockedProvider from "../testHelper";
import { screen } from "@testing-library/react";
import Footer, { FooterContent } from "../../layouts/Footer";

describe("Footer", () => {
  it("shoud render footer success", () => {
    renderWithMockedProvider(<Footer />);
    expect(screen.getByText(FooterContent.conditions)).toBeInTheDocument();
  });
});
