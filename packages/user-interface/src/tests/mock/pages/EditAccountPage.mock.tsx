import EditAccountPage from "../../../pages/EditAccountPage";
import TestProvider, {
  testPaths as paths,
} from "../../../providers/TestProvider";
import { getBurgerProfiel } from "../data/burger.mock";

export const MockEditAccountPage = () => {
  const routes = [
    {
      path: paths.account,
      children: [
        {
          path: paths.editAccount,
          element: <EditAccountPage />,
        },
      ],
    },
  ];

  return (
    <TestProvider
      mocks={[getBurgerProfiel]}
      routes={routes}
      initialIndex={1}
      initialEntries={[
        paths.account,
        `${paths.editAccount}?prop=telefoonnummer`,
      ]}
    ></TestProvider>
  );
};
