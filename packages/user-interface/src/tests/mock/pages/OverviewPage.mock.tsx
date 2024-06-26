import TestProvider, {
  testPaths as paths,
} from "../../../providers/TestProvider";
import {
  mockRequestDefault,
  mockRequestTwoTasks,
  mockRequestsPagination,
} from "../data/OverviewPageRequests.mock";
import { OverviewPage } from "../../..";

const route = [
  {
    path: paths.overview,
    children: [
      {
        index: true,
        element: <OverviewPage showIntro={true} />,
      },
    ],
  },
];

const routeShowLessTasks = [
  {
    path: paths.overview,
    children: [
      {
        index: true,
        element: <OverviewPage showIntro={true} fetchTasksLength={2} />,
      },
    ],
  },
];

const routeShowLessCases = [
  {
    path: paths.overview,
    children: [
      {
        index: true,
        element: <OverviewPage showIntro={true} fetchCasesLength={1} />,
      },
    ],
  },
];

export const MockOverviewPage = () => (
  <TestProvider
    mocks={mockRequestDefault}
    routes={route}
    initialIndex={0}
    initialEntries={[paths.overview]}
  ></TestProvider>
);

export const MockOverviewPageLessTasks = () => (
  <TestProvider
    mocks={mockRequestTwoTasks}
    routes={routeShowLessTasks}
    initialIndex={0}
    initialEntries={[paths.overview]}
  ></TestProvider>
);

export const MockOverviewPageLessCases = () => (
  <TestProvider
    mocks={mockRequestDefault}
    routes={routeShowLessCases}
    initialIndex={0}
    initialEntries={[paths.overview]}
  ></TestProvider>
);

export const MockOverviewPagePagination = () => (
  <TestProvider
    mocks={mockRequestsPagination}
    routes={route}
    initialIndex={0}
    initialEntries={[paths.overview]}
  ></TestProvider>
);
