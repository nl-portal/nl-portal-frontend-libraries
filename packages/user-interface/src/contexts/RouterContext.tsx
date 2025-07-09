import React, { ReactNode, useMemo, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider as ReactRouterProvider,
  RouteObject,
} from "react-router";
import { NavigationItem } from "../interfaces/navigation-item";

export interface RouterContextInterface {
  routes: RouteObject[];
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
}

export const RouterProvider = ({
  element,
  routes: initRoutes,
  navigationItems: initNavigationItems,
}: Props) => {
  const [routes, setRoutes] = useState(initRoutes);
  const [navigationItems, setNavigationItems] = useState(initNavigationItems);

  const router = useMemo(
    () =>
      createBrowserRouter([
        {
          element,
          children: routes,
          handle: { label: "breadcrumb.overview" },
        },
      ]),
    [routes],
  );

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
