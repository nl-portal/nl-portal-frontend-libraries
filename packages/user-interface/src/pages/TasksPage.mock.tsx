import TasksPage from "./TasksPage";
import TestProvider, { testPaths as paths } from "../providers/TestProvider";
import { mockRequest } from "./TasksPageRequests.mock";

const route = [
  {
    path: paths.overview,
    element: <></>,
  },
  {
    path: paths.cases,
    children: [
      {
        index: true,
        element: <TasksPage />,
      },
    ],
  },
];
export const MockTasksPage = () => (
  <TestProvider
    mocks={mockRequest}
    routes={route}
    initialIndex={1}
    initialEntries={[paths.overview, paths.cases]}
  ></TestProvider>
);
