import { describe, it, expect } from "vitest";
import { MockCasesPage } from "./CasesPage.mock";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("The CasesPage", () => {
  let tabLopendeZaken = () =>
    screen.getByRole("tab", { name: "Current cases" });
  let tabAfgerondeZaken = () =>
    screen.getByRole("tab", { name: "Closed cases" });
  let getAllBezwaarCases = () => screen.getAllByText("case.B0756.title");
  let getAllOpasCases = () =>
    screen.getAllByText("case.Aanvraag-stadspas-behandelen-v6.title");

  it("should render several active cases", async () => {
    render(MockCasesPage());

    await waitFor(() => {
      expect(getAllOpasCases()[0]).toBeVisible();
    });

    expect(tabLopendeZaken().getAttribute("aria-selected")).toBe("true");
    expect(tabAfgerondeZaken().getAttribute("aria-selected")).toBe("false");

    expect(getAllBezwaarCases()[0]).not.toBeVisible();

    expect(getAllOpasCases().length).toEqual(2);

    expect(screen.getByText("2/3/2024")).toBeVisible();
  });

  it("should allow me to go to the overview of closed cases", async () => {
    render(MockCasesPage());

    await waitFor(() => {
      expect(getAllOpasCases()[0]).toBeVisible();
    });

    fireEvent.click(tabAfgerondeZaken());

    expect(tabLopendeZaken().getAttribute("aria-selected")).toBe("false");
    expect(tabAfgerondeZaken().getAttribute("aria-selected")).toBe("true");

    expect(getAllBezwaarCases()[0]).toBeVisible();

    expect(getAllOpasCases()[0]).not.toBeVisible();

    expect(getAllBezwaarCases().length).toEqual(2);

    expect(screen.getAllByText("2/1/2024")[0]).toBeVisible();
  });
});
