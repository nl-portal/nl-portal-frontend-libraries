import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import {
  MockOverviewPage,
  MockOverviewPageLessCases,
  MockOverviewPageLessTasks,
  MockOverviewPagePagination,
} from "../mock/pages/OverviewPage.mock";
import { testPaths as paths } from "../../providers/TestProvider";

describe("OverviewPage", () => {
  const openZaak1 = () => screen.getByText("case.OPENZAAK1.title");
  const openZaak2 = () => screen.getByText("case.OPENZAAK2.title");
  const openZaak2Hidden = () => screen.queryByText("case.OPENZAAK2.title");
  const geslotenZaak1 = () => screen.queryByText("case.GESLOTENZAAK1.title");
  const geslotenZaak2 = () => screen.queryByText("case.GESLOTENZAAK2.title");
  const taskFetchError = () =>
    screen.queryByText("There was an error, try again later.");
  const taak1 = () => screen.getByText("OPEN TAAK 1");
  const taak2 = () => screen.getByText("OPEN TAAK 2");
  const taak3 = () => screen.queryByText("OPEN TAAK 3");
  const viewAllTasks = () => screen.queryByText("Bekijk alle taken");
  const viewAllCases = () => screen.queryByText("Bekijk alle zaken (20)");

  it("should show several active cases", async () => {
    render(MockOverviewPage());

    await waitFor(() => {
      expect(openZaak1()).toBeVisible();
    });

    expect(openZaak1()).toBeVisible();
    expect(screen.getByText("1 januari 2024")).toBeVisible();
    expect(
      screen.getByRole("link", { name: "case.OPENZAAK1.title" }),
    ).toHaveAttribute(
      "href",
      paths.case("6f268986-17c2-4045-9340-94101bfad3ca"),
    );

    expect(openZaak2()).toBeVisible();
    expect(screen.getByText("2 januari 2024")).toBeVisible();
    expect(
      screen.getByRole("link", { name: "case.OPENZAAK2.title" }),
    ).toHaveAttribute(
      "href",
      paths.case("009e2451-44b3-4969-91e3-205d8b261fe1"),
    );

    expect(geslotenZaak1()).not.toBeInTheDocument();
    expect(geslotenZaak2()).not.toBeInTheDocument();

    expect(taskFetchError()).not.toBeInTheDocument();

    expect(taak1()).toBeVisible();
    expect(taak2()).toBeVisible();
    expect(taak3()).toBeVisible();
    expect(viewAllTasks()).toBeInTheDocument();
    expect(viewAllCases()).not.toBeInTheDocument();
  });

  it("should not show task 3", async () => {
    render(MockOverviewPageLessTasks());

    await waitFor(() => {
      expect(openZaak1()).toBeVisible();
    });

    expect(taak1()).toBeVisible();
    expect(taak2()).toBeVisible();
    expect(taak3()).not.toBeInTheDocument();
  });

  it("should not show zaak 2", async () => {
    render(MockOverviewPageLessCases());

    await waitFor(() => {
      expect(openZaak1()).toBeVisible();
    });

    expect(openZaak1()).toBeVisible();
    expect(openZaak2Hidden()).not.toBeInTheDocument();
  });

  it("should show Bekijk alle zaken(20)", async () => {
    render(MockOverviewPagePagination());

    await waitFor(() => {
      expect(openZaak1()).toBeVisible();
    });

    expect(viewAllTasks()).toBeVisible();
    expect(viewAllCases()).toBeVisible();
  });
});
