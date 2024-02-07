import { describe, it, expect } from "vitest";
import { MockCasesPage } from "./CasesPage.mock";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("The CasesPage", () => {
  it("should render several cases", async () => {
    render(MockCasesPage());
    await waitFor(() => {
      expect(screen.getByText("case.OPENZAAK1.title")).toBeVisible();
    });
    expect(screen.getByText("case.GESLOTENZAAK1.title")).not.toBeVisible();
    expect(screen.getByText("case.GESLOTENZAAK2.title")).not.toBeVisible();
    expect(screen.getByText("case.OPENZAAK1.title")).toBeVisible();
    expect(screen.getByText("case.OPENZAAK2.title")).toBeVisible();
  });

  it("should allow me to go to the overview of closes cases", async () => {
    render(MockCasesPage());
    const tabAfgerondeZaken = screen.getByRole("tab", { name: "Closed cases" });
    fireEvent.click(tabAfgerondeZaken);
    await waitFor(() => {
      expect(screen.getByText("case.GESLOTENZAAK1.title")).toBeVisible();
    });
    expect(screen.getByText("case.GESLOTENZAAK1.title")).toBeVisible();
    expect(screen.getByText("case.GESLOTENZAAK2.title")).toBeVisible();
    expect(screen.getByText("case.OPENZAAK1.title")).not.toBeVisible();
    expect(screen.getByText("case.OPENZAAK2.title")).not.toBeVisible();
  });
});
