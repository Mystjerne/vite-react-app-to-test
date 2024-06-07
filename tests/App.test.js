import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import App from "../src/App";

test("renders password field", () => {
  render(<App />);

  // const linkElement = screen.
  const passwordField = screen.getByText("Vite + React");

  expect(passwordField).toBeInTheDocument();
});
