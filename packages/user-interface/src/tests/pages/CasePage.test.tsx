import { describe, it, expect, beforeAll } from "vitest";
import {
  Matcher,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import {
  MockCasePage,
  MockCasePageWithoutContactMoments,
  MockCasePageWithoutDocuments,
} from "../mock/pages/CasePage.mock";

describe("CasePage", () => {
  let pdfFile: Matcher;

  beforeAll(() => {
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
    pdfFile = "Certificaat WWJB.pdf (pdf, 60.2 kB)";
  });

  it("should render with all elements present", async () => {
    render(MockCasePage());

    await waitForElementToBeRemoved(() => screen.getAllByLabelText("Loading"));

    expect(screen.getByText(pdfFile)).toBeVisible();
    expect(screen.getByText("case.B0756.title")).toBeVisible();
    expect(screen.getByText("ZAAK-2023-0000007947")).toBeVisible();
    expect(screen.getByRole("table")).toBeVisible();
    expect(screen.getByText("Dit is een sms")).toBeVisible();
    expect(screen.queryByText("Previous contact moments")).toBeVisible();
  });

  it("should render without any documents present and show message that no documents are present", async () => {
    render(MockCasePageWithoutDocuments());

    await waitForElementToBeRemoved(() => screen.getAllByLabelText("Loading"));

    expect(screen.queryByText(pdfFile)).toBeNull();
    expect(screen.queryByText("There are no documents.")).toBeVisible();
    expect(screen.queryByText("Previous contact moments")).toBeVisible();
  });

  it("should render without any contactmoments present and not show header contactmoments", async () => {
    render(MockCasePageWithoutContactMoments());

    await waitForElementToBeRemoved(() => screen.getAllByLabelText("Loading"));

    expect(screen.getByText("Documents"));
    expect(screen.queryByText(pdfFile)).toBeVisible();
    expect(screen.queryByText("Previous contact moments")).toBeNull();
  });
});
