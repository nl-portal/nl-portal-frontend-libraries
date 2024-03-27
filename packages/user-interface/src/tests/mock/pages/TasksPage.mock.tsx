import TasksPage from "../../../pages/TasksPage";
import TestProvider, {
  testPaths as paths,
} from "../../../providers/TestProvider";
import { mockRequest } from "../data/TasksPageRequests.mock";

const route = [
  {
    path: paths.tasks,
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
    initialEntries={[paths.tasks]}
  ></TestProvider>
);
