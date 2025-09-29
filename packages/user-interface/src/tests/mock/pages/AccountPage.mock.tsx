import AccountPage from "../../../pages/AccountPage";
import TestProvider, { testPaths } from "../../../providers/TestProvider";
import { getBurgerProfiel } from "../data/burger.mock";
import { getPersoon } from "../data/persoon.mock";
import { getProduct } from "../data/product.mock";
import { getUnopenedBerichten } from "../data/unopened-berichten";

const routes = [
  {
    path: testPaths.account,
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
    mocks={[getPersoon, getBurgerProfiel, getProduct, getUnopenedBerichten]}
    routes={routes}
    initialIndex={0}
    initialEntries={[testPaths.account]}
  ></TestProvider>
);
