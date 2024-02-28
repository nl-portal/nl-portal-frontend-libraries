import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render } from "@testing-library/react";
import { MockWrapper } from "@nl-portal/nl-portal-localization";
import { unmountComponentAtNode } from "react-dom";
import Page from "./PageMetaData";
import { NavigationItem } from "../interfaces/navigation-item";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { testPaths as paths } from "../providers/TestProvider";

let container!: HTMLElement | undefined;

const navigationItems: NavigationItem[] = [
  {
    titleTranslationKey: "overview",
    path: paths.overview,
    icon: <span />,
  },
];

const route = {
  path: paths.overview,
  element: (
    <Page navigationItems={navigationItems}>
      <span>test</span>
    </Page>
  ),
};

const router = createBrowserRouter([
  {
    element: <Outlet />,
    children: [route],
  },
]);

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
    render(<RouterProvider router={router} />, {
      wrapper: MockWrapper as React.ComponentType,
      container,
    });

    expect(document.title).toContain("Overview");
  });
});
