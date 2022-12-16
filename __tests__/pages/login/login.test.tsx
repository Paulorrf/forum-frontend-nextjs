import { render, screen } from "@testing-library/react";
import Login from "../../../src/pages/login";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Login />);

    const title = screen.getByText("LOGIN");

    // const heading = screen.getByRole("heading", {
    //   name: /welcome to next\.js!/i,
    // });

    expect(title).toBeInTheDocument();
  });
});
