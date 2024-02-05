import { describe, it, expect } from "vitest";
import { MockCasesPage } from "./CasesPage.mock";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("The CasesPage", () => {
  it("should render several cases", async () => {
    render(MockCasesPage());
    await waitFor(() => {
      expect(screen.getAllByText("case.Aanvraag-stadspas-behandelen-v6.title")[0]).toBeVisible();
    });
    screen.debug();
    expect(screen.getAllByText("case.B0756.title")[0]).not.toBeVisible();
    expect(screen.getAllByText("case.Aanvraag-stadspas-behandelen-v6.title").length).toEqual(2);
    expect(screen.getAllByText("1-2-2024")[0]).toBeVisible();
  });

  it("should allow me to go to the closes cases", async () => {
    render(MockCasesPage());
    await waitFor(() => {
      expect(screen.getAllByText("case.Aanvraag-stadspas-behandelen-v6.title")[0]).toBeVisible();
    });
    const tabAfgerondeZaken = screen.getByRole("tab", {name: "Closed cases"});
    fireEvent.click(tabAfgerondeZaken);
    screen.debug();
    expect(screen.getAllByText("case.B0756.title")[0]).toBeVisible();
    expect(screen.getAllByText("case.Aanvraag-stadspas-behandelen-v6.title")[0]).not.toBeVisible();
    expect(screen.getAllByText("case.B0756.title").length).toEqual(2);
    expect(screen.getAllByText("2-2-2024")[0]).toBeVisible();
  });

});