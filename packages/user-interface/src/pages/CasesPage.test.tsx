import { describe, it, expect } from "vitest";
import { MockCasesPage } from "./CasesPage.mock";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("The CasesPage", () => {

  const tabLopendeZaken = () =>
    screen.getByRole("tab", { name: "Current cases" });
  const tabAfgerondeZaken = () =>
    screen.getByRole("tab", { name: "Closed cases" });
  const systemLocale = navigator.languages[0];
  const openZaak1 = () => 
    screen.getByText("case.OPENZAAK1.title");
    const openZaak1Date = "2024-01-01";
  const openZaak2 = () => 
    screen.getByText("case.OPENZAAK2.title");
    const openZaak2Date = "2024-01-02";
  const geslotenZaak1 = () => 
    screen.getByText("case.GESLOTENZAAK1.title");
    const geslotenZaak1Date = "2024-02-01";
  const geslotenZaak2 = () =>
    screen.getByText("case.GESLOTENZAAK2.title");
    const geslotenZaak2Date = "2024-02-02";

  it("should render several active cases", async () => {
    render(MockCasesPage());
    await waitFor(() => {
      expect(openZaak1()).toBeVisible();
    });

    expect(tabLopendeZaken().getAttribute("aria-selected")).toBe("true");
    expect(tabAfgerondeZaken().getAttribute("aria-selected")).toBe("false");

    expect(openZaak1()).toBeVisible();
    let screenDate = new Date(Date.parse(openZaak1Date));
    expect(screen.getByText(screenDate.toLocaleDateString())).toBeVisible();
    expect(openZaak2()).toBeVisible();
    screenDate = new Date(Date.parse(openZaak2Date));
    expect(screen.getByText(screenDate.toLocaleDateString())).toBeVisible();

    expect(geslotenZaak1()).not.toBeVisible();
    expect(geslotenZaak2()).not.toBeVisible();
  });

  it("should allow me to go to the overview of closed cases", async () => {
    render(MockCasesPage());
    fireEvent.click(tabAfgerondeZaken());
    await waitFor(() => {
      expect(geslotenZaak1()).toBeVisible();
    });

    expect(tabLopendeZaken().getAttribute("aria-selected")).toBe("false");
    expect(tabAfgerondeZaken().getAttribute("aria-selected")).toBe("true");

    expect(geslotenZaak1()).toBeVisible();
    let screenDate = new Date(Date.parse(geslotenZaak1Date));
    expect(screen.getByText(screenDate.toLocaleDateString())).toBeVisible();
    expect(geslotenZaak2()).toBeVisible();
    screenDate = new Date(Date.parse(geslotenZaak2Date));
    expect(screen.getByText(screenDate.toLocaleDateString())).toBeVisible();

    expect(openZaak1()).not.toBeVisible();
    expect(openZaak2()).not.toBeVisible();
  });
});
