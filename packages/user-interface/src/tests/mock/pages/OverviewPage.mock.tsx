import TestProvider, {
  testPaths as paths,
} from "../../../providers/TestProvider";
import { OverviewPage } from "../../..";
import { getZaken } from "../data/zaken.mock";
import { getTaken } from "../data/taken.mock";

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

export const MockOverviewPage = () => (
  <TestProvider
    mocks={[getZaken({ pageSize: 4 }), getTaken({ pageSize: 5 })]}
    routes={route}
    initialIndex={0}
    initialEntries={[paths.overview]}
  ></TestProvider>
);

export const MockOverviewPageLessTasks = () => (
  <TestProvider
    mocks={[getZaken({ pageSize: 4 }), getTaken({ pageSize: 2 })]}
    routes={routeShowLessTasks}
    initialIndex={0}
    initialEntries={[paths.overview]}
  ></TestProvider>
);

export const MockOverviewPagePagination = () => (
  <TestProvider
    mocks={[
      getZaken({ pageSize: 4, totalElements: 20 }),
      getTaken({ pageSize: 5 }),
    ]}
    routes={route}
    initialIndex={0}
    initialEntries={[paths.overview]}
  ></TestProvider>
);
