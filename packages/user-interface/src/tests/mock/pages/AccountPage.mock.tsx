import AccountPage from "../../../pages/AccountPage";
import TestProvider, {
  testPaths as paths,
} from "../../../providers/TestProvider";
import { mocksRequestBurgerGegevens } from "../data/AccountPageRequests.mock";

const routes = [
  {
    path: paths.overview,
    element: <></>,
  },
  {
    path: paths.account,
    children: [
      {
        index: true,
        element: <AccountPage showNotificationSubSection={false} />,
      },
    ],
  },
];

export const MockAccountPage = () => (
  <TestProvider
    mocks={mocksRequestBurgerGegevens}
    routes={routes}
    initialIndex={1}
    initialEntries={[paths.overview, paths.account]}
  ></TestProvider>
);
