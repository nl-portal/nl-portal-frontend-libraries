import { describe, it, expect, beforeAll } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MockAccountPage } from "../mock/pages/AccountPage.mock";

describe("AccountPage", () => {
  beforeAll(() => {
    if (!HTMLDialogElement.prototype.showModal) {
      HTMLDialogElement.prototype.showModal = function () {};
    }
    if (!HTMLDialogElement.prototype.close) {
      HTMLDialogElement.prototype.close = function () {};
    }

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
      expect(
        screen.getByTestId("persoonsgegevens-firstname"),
      ).toHaveTextContent("Sierra");
    });

    expect(
      screen.getByTestId("persoonsgegevens-nationality"),
    ).toHaveTextContent("Nederlandse, Portugees");
    expect(screen.getByTestId("persoonsgegevens-lastname")).toHaveTextContent(
      "de Kooyman - van der Maassen",
    );
    expect(screen.getByTestId("persoonsgegevens-gender")).toHaveTextContent(
      "vrouw",
    );
    expect(screen.getByTestId("persoonsgegevens-bsn")).toHaveTextContent(
      "999991954",
    );
    expect(screen.getByTestId("persoonsgegevens-birthdate")).toHaveTextContent(
      "3 maart 2003",
    );
    expect(screen.getByTestId("persoonsgegevens-country")).toHaveTextContent(
      "Nederland",
    );
    expect(screen.getByTestId("persoonsgegevens-street")).toHaveTextContent(
      "Leyweg 61e",
    );
    expect(screen.getByTestId("persoonsgegevens-postcode")).toHaveTextContent(
      "2545CC 's-Gravenhage",
    );
  });
});
