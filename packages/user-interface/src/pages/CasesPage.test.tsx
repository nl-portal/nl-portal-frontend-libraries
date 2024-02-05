import { describe, it, expect } from "vitest";
import { MockCasesPage } from "./CasesPage.mock";
import { render, screen, waitFor } from "@testing-library/react";

describe("CasesPage", () => {
  it("should render several cases", async () => {
    render(MockCasesPage());
    await waitFor(() => {
      expect(screen.getAllByText("case.Aanvraag-stadspas-behandelen-v6.title")[0]).toBeVisible();
    });
    expect(screen.getAllByText("case.Aanvraag-stadspas-behandelen-v6.title").length).toEqual(67);
    //@TODO fix language settings
    expect(screen.getAllByText("1-2-2024")[0]).toBeVisible();
  });
});