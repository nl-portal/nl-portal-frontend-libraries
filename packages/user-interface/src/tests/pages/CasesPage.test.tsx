import { describe, it, expect } from "vitest";
import { MockCasesPage } from "../mock/pages/CasesPage.mock";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { testPaths as paths } from "../../providers/TestProvider";

describe("The CasesPage", () => {
  const tabLopendeZaken = () =>
    screen.getByRole("tab", { name: "Lopende zaken" });
  const tabAfgerondeZaken = () =>
    screen.getByRole("tab", { name: "Afgeronde zaken" });
  const openZaak1 = () => screen.getAllByText("case.OPENZAAK1.title")[0];
  const openZaak2 = () => screen.getAllByText("case.OPENZAAK2.title")[0];
  const geslotenZaak1 = () =>
    screen.getAllByText("case.GESLOTENZAAK1.title")[1];
  const geslotenZaak2 = () =>
    screen.getAllByText("case.GESLOTENZAAK2.title")[1];

  it("should render several active cases", async () => {
    render(MockCasesPage());

    await waitFor(() => {
      expect(openZaak1()).toBeVisible();
    });

    expect(tabLopendeZaken().getAttribute("aria-selected")).toBe("true");
    expect(tabAfgerondeZaken().getAttribute("aria-selected")).toBe("false");

    expect(openZaak1()).toBeVisible();
    expect(
      screen.getByRole("link", { name: "case.OPENZAAK1.title" }),
    ).toHaveAttribute(
      "href",
      paths.case("6f268986-17c2-4045-9340-94101bfad3ca"),
    );

    expect(openZaak2()).toBeVisible();
    expect(
      screen.getByRole("link", { name: "case.OPENZAAK2.title" }),
    ).toHaveAttribute(
      "href",
      paths.case("009e2451-44b3-4969-91e3-205d8b261fe1"),
    );
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
    expect(
      screen.getByRole("link", { name: "case.GESLOTENZAAK1.title" }),
    ).toHaveAttribute(
      "href",
      paths.case("0c6c5300-fd08-4fae-977d-c85a2c7535e8"),
    );
    expect(geslotenZaak2()).toBeVisible();
    expect(
      screen.getByRole("link", { name: "case.GESLOTENZAAK2.title" }),
    ).toHaveAttribute(
      "href",
      paths.case("e7c34f50-1d2e-4269-8eef-18da509358f4"),
    );
  });
});
