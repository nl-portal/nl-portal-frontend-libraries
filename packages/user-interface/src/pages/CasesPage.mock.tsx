import CasesPage from "./CasesPage";
import TestProvider from "../providers/TestProvider";
import { mockRequest } from "./CasesPageRequests.mock";

const route = "/zaken";

export const MockCasesPage = () => (
  <TestProvider mocks={mockRequest} route={route}>
    <CasesPage/>
  </TestProvider>
);
