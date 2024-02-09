import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MockCasesPage } from "./CasesPage.mock";

describe("OverviewPage", () => {
  const openZaak1 = () => screen.getByText("case.OPENZAAK1.title");
  const openZaak1Date = "2024-01-01";
  const openZaak2 = () => screen.getByText("case.OPENZAAK2.title");
  const openZaak2Date = "2024-01-02";
  const geslotenZaak1 = () => screen.getByText("case.GESLOTENZAAK1.title");
  const geslotenZaak2 = () => screen.getByText("case.GESLOTENZAAK2.title");

  it("should show several active cases", async () => {
    render(MockCasesPage());
    await waitFor(() => {
      expect(openZaak1()).toBeVisible();
    });

    expect(openZaak1()).toBeVisible();
    let screenDate = new Date(Date.parse(openZaak1Date));
    expect(screen.getByText(screenDate.toLocaleDateString())).toBeVisible();
    expect(
      screen.getByRole("link", { name: "case.OPENZAAK1.title" }),
    ).toHaveAttribute(
      "href",
      "/zaken/zaak?id=6f268986-17c2-4045-9340-94101bfad3ca",
    );

    expect(openZaak2()).toBeVisible();
    screenDate = new Date(Date.parse(openZaak2Date));
    expect(screen.getByText(screenDate.toLocaleDateString())).toBeVisible();
    expect(
      screen.getByRole("link", { name: "case.OPENZAAK2.title" }),
    ).toHaveAttribute(
      "href",
      "/zaken/zaak?id=009e2451-44b3-4969-91e3-205d8b261fe1",
    );

    expect(geslotenZaak1()).not.toBeVisible();
    expect(geslotenZaak2()).not.toBeVisible();
  });
});
