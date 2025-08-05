import TasksPage from "../../../pages/TasksPage";
import TestProvider, { testPaths } from "../../../providers/TestProvider";
import { getTaken } from "../data/taken.mock";

const routes = [
  {
    path: testPaths.tasks,
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
    mocks={[getTaken({})]}
    routes={routes}
    initialIndex={0}
    initialEntries={[testPaths.tasks]}
  ></TestProvider>
);
