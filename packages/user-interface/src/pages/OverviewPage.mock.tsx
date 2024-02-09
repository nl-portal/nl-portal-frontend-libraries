import OverviewPage from "./OverviewPage";
import TestProvider from "../providers/TestProvider";
import { mockRequest } from "./CasesPageRequests.mock";

const route = "/zaken/zaak?id=82cb13cf-d2f9-4e3e-ac07-751373035ecb";

export const MockOverviewPage = () => (
  <TestProvider mocks={mockRequest} route={route}>
    <OverviewPage/>
  </TestProvider>
);
