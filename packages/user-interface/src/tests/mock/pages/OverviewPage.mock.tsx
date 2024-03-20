import TestProvider, {
  testPaths as paths,
} from "../../../providers/TestProvider";
import { mockRequest } from "../data/OverviewPageRequests.mock";
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
        element: <OverviewPage showIntro={true} tasksPreviewLength={2} />,
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
        element: <OverviewPage showIntro={true} casesPreviewLength={1} />,
      },
    ],
  },
];

export const MockOverviewPage = () => (
  <TestProvider
    mocks={mockRequest}
    routes={route}
    initialIndex={0}
    initialEntries={[paths.overview]}
  ></TestProvider>
);

export const MockOverviewPageLessTasks = () => (
  <TestProvider
    mocks={mockRequest}
    routes={routeShowLessTasks}
    initialIndex={0}
    initialEntries={[paths.overview]}
  ></TestProvider>
);

export const MockOverviewPageLessCases = () => (
  <TestProvider
    mocks={mockRequest}
    routes={routeShowLessCases}
    initialIndex={0}
    initialEntries={[paths.overview]}
  ></TestProvider>
);
