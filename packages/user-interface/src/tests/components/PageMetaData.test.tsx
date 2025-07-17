import { describe, it, expect } from "vitest";
import { render, waitFor, screen } from "@testing-library/react";
import { MockOverviewPage } from "../mock/pages/OverviewPage.mock";

describe("Page", () => {
  const openZaak1 = () => screen.getByText("case.OPENZAAK1.title");

  it("should correctly set the document title", async () => {
    render(MockOverviewPage());

    await waitFor(() => {
      expect(openZaak1()).toBeVisible();
    });

    expect(document.title).toContain("Overzicht - NL Portal");
  });
});
