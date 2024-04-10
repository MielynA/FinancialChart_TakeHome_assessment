import { render, screen } from "@testing-library/react";
import axios from "axios";
import App from "../../App";

jest.mock("axios");

test("renders financial dashboard", () => {
  render(<App />);
  expect(screen.getByText("Financial Dashboard")).toBeInTheDocument();
});
