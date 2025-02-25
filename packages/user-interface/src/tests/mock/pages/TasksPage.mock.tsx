import TasksPage from "../../../pages/TasksPage";
import TestProvider, {
  testPaths as paths,
} from "../../../providers/TestProvider";
import { getTaken } from "../data/taken.mock";

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
    mocks={[getTaken({})]}
    routes={route}
    initialIndex={1}
    initialEntries={[paths.tasks]}
  ></TestProvider>
);
