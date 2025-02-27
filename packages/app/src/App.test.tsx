import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "./App";

describe("App", () => {
  const openZaak1 = () => screen.getByText("case.OPENZAAK1.title");

  it("renders without crashing", async () => {
    render(<App />);

    await waitFor(() => {
      expect(openZaak1()).toBeVisible();
    });
  });
});
