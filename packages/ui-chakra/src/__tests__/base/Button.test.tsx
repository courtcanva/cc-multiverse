import { Button } from "../../base/Button/Button";
import { render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";

describe("base/Button", () => {
  it("should render button and listen on click handler", async () => {
    const onClick = jest.fn();

    render(<Button onClick={onClick}>Submit</Button>);

    const submitBtn = screen.getByText(/submit/i);
    user.click(submitBtn);

    expect(submitBtn).toBeInTheDocument();

    await waitFor(() => {
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
});
