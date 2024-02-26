import AccountPage from "./AccountPage";
import TestProvider from "../providers/TestProvider";
import { mocksRequestBurgerGegevens } from "./AccountPageRequests.mock";

const route = "/zaken/zaak?id=82cb13cf-d2f9-4e3e-ac07-751373035ecb";

export const MockAccountPage = () => (
  <TestProvider mocks={mocksRequestBurgerGegevens} route={route}>
    <AccountPage showNotificationSubSection={false} />
  </TestProvider>
);
