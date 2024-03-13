import { gql } from "@apollo/client";
import EditAccountPage from "./EditAccountPage";
import TestProvider, { testPaths as paths } from "../providers/TestProvider";

export const MockEditAccountPage = () => {
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
          element: <></>,
        },
        {
          path: paths.editAccount,
          element: <EditAccountPage />,
        },
      ],
    },
  ];

  const EXAMPLE_QUERY = gql`
    mutation SubmitTask($id: UUID!, $submission: JSON!) {
      submitTask(id: $id, submission: $submission) {
        id
        objectId
        formId
        title
        status
        date
      }
    }
  `;

  const mocks = [
    {
      request: {
        query: EXAMPLE_QUERY,
        variables: {
          name: "Test",
        },
      },
      result: {
        data: {
          task: {
            id: "1",
            name: "Informatie aanvraag",
            zaakId: "23jfdi45-2345-2345-jf45k323oi12",
          },
        },
      },
    },
  ];

  return (
    <TestProvider
      mocks={mocks}
      routes={routes}
      initialIndex={2}
      initialEntries={[
        paths.overview,
        paths.account,
        `${paths.editAccount}?prop=telefoonnummer`,
      ]}
    ></TestProvider>
  );
};
