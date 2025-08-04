import React, { ReactNode, useMemo, useState } from "react";
import {
  createBrowserRouter,
  createMemoryRouter,
  RouterProvider as ReactRouterProvider,
  RouteObject,
} from "react-router";
import { NavigationItem } from "../interfaces/navigation-item";

export interface RouterContextInterface {
  routes: RouteObject[];
  initNavigationItems: NavigationItem[][];
  navigationItems: NavigationItem[][];
  updateRoutes: (newRoutes: RouteObject[]) => void;
  updateNavigationItems: (newNavigationItems: NavigationItem[][]) => void;
}

const RouterContext = React.createContext<RouterContextInterface>(
  {} as RouterContextInterface,
);

interface Props {
  element: ReactNode;
  routes: RouteObject[];
  navigationItems: NavigationItem[][];
  test?: {
    initialIndex?: number;
    initialEntries?: string[];
  };
}

export const RouterProvider = ({
  element,
  routes: initRoutes,
  navigationItems: initNavigationItems,
  test,
}: Props) => {
  const [routes, setRoutes] = useState(initRoutes);
  const [navigationItems, setNavigationItems] = useState(
    initNavigationItems.map((group) => group.filter((item) => !item.themeSlug)),
  );

  const router = useMemo(() => {
    const route = {
      element,
      children: routes,
      handle: { label: "breadcrumb.overview" },
    };

    if (test) return createMemoryRouter([route], test);
    return createBrowserRouter([route]);
  }, [routes]);

  const updateRoutes = (newRoutes: RouteObject[]) => {
    setRoutes(newRoutes);
  };

  const updateNavigationItems = (newNavigationItems: NavigationItem[][]) => {
    setNavigationItems(newNavigationItems);
  };

  return (
    <RouterContext.Provider
      value={{
        routes,
        initNavigationItems,
        navigationItems,
        updateRoutes,
        updateNavigationItems,
      }}
    >
      <ReactRouterProvider router={router} />
    </RouterContext.Provider>
  );
};

export default RouterContext;
