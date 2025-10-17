import { describe, it, expect, beforeAll } from "vitest";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import {
  MockCaseDetailsPage,
  MockCaseDetailsPageWithoutContactMoments,
  MockCaseDetailsPageWithoutDocuments,
} from "../mock/pages/CaseDetailsPage.mock.tsx";

describe("CaseDetailsPage", () => {
  const skeleton = () => screen.getAllByLabelText("Aan het laden");

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
  });

  it("should render with all elements present", async () => {
    render(MockCaseDetailsPage());

    await waitFor(skeleton);
    await waitForElementToBeRemoved(skeleton);

    expect(screen.getByText("Certificaat WWJB")).toBeVisible();
    expect(screen.getByText("Bezwaarschrift")).toBeVisible();
    expect(screen.getByText("ZAAK-2023-0000007947")).toBeVisible();
    expect(screen.getByText("Betaalgeschiedenis 2")).toBeVisible();
    expect(screen.getByText("Kamillestraat 22")).toBeVisible();
    expect(screen.getByText("Dit is een sms")).toBeVisible();
    expect(screen.queryByText("Eerdere contactmomenten")).toBeVisible();
  });

  it("should render without any documents present and show message that no documents are present", async () => {
    render(MockCaseDetailsPageWithoutDocuments());

    await waitFor(skeleton);
    await waitForElementToBeRemoved(skeleton);

    expect(screen.queryByText("Certificaat WWJB")).toBeNull();
    expect(
      screen.queryByText("Er zijn geen documenten beschikbaar."),
    ).toBeVisible();
    expect(screen.queryByText("Eerdere contactmomenten")).toBeVisible();
  });

  it("should render without any contactmoments present and not show header contactmoments", async () => {
    render(MockCaseDetailsPageWithoutContactMoments());

    await waitFor(skeleton);
    await waitForElementToBeRemoved(skeleton);

    expect(screen.getByText("Documenten"));
    expect(screen.getByText("Certificaat WWJB")).toBeVisible();
    expect(screen.queryByText("Eerdere contactmomenten")).toBeNull();
  });
});
