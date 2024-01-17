import { describe, it, expect, beforeAll } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MockAccountPage } from "./account-page.mock";

describe("AccountPage", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vitest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vitest.fn(), // Deprecated
        removeListener: vitest.fn(), // Deprecated
        addEventListener: vitest.fn(),
        removeEventListener: vitest.fn(),
        dispatchEvent: vitest.fn(),
      })),
    });
  });

  it("should render with all elements present and show double nationality correctly", async () => {
    render(MockAccountPage());
    await waitFor(() => {
      expect(screen.getByText("Sierra")).toBeInTheDocument();
    });
    expect(screen.getByText("Nederlandse, Portugees")).toBeVisible();
    expect(screen.getByText("Kooyman")).toBeVisible();
    expect(screen.getByText("vrouw")).toBeVisible();
    expect(screen.getByText("999991954")).toBeVisible();
    expect(screen.getByText("3 March 2003")).toBeVisible();
    expect(screen.getByText("Nederland")).toBeVisible();
    expect(screen.getByText("Leyweg 61e")).toBeVisible();
    expect(screen.getByText("2545CC 's-Gravenhage")).toBeVisible();
  });
});
