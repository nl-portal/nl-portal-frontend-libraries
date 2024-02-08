import TasksPage from "./TasksPage";
import TestProvider from "../providers/TestProvider";
import { mockRequest } from "./TasksPageRequests.mock";

const route = "/taken";

export const MockTasksPage = () => (
  <TestProvider mocks={mockRequest} route={route}>
    <TasksPage/>
  </TestProvider>
);
