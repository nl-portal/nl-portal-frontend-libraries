import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { MockWrapper } from "@nl-portal/nl-portal-localization";
import { unmountComponentAtNode } from "react-dom";
import Page from "./PageMetaData";
import LayoutProvider from "../providers/LayoutProvider";
import { PortalPage } from "../interfaces/portal-page";

let container!: HTMLElement | undefined;

const testPage: PortalPage = {
  icon: <span />,
  pageComponent: <span />,
  path: "/",
  titleTranslationKey: "overview",
  showInMenu: true,
  isHome: true,
};

describe("Page", () => {
  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    const containerElement = container as HTMLElement;
    unmountComponentAtNode(containerElement);
    containerElement.remove();
    container = undefined;
  });

  it("should correctly set the document title", () => {
    render(
      <LayoutProvider initialPage={testPage}>
        <Page page={testPage}>
          <span>test</span>
        </Page>
      </LayoutProvider>,
      { wrapper: MockWrapper as React.ComponentType, container },
    );

    expect(document.title).toContain("Overview");
  });
});
