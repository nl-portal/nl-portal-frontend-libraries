import CaseDetailsPage from "../../../pages/CaseDetailsPage";
import TestProvider, { testPaths } from "../../../providers/TestProvider";
import { getZaak } from "../data/zaak.mock";
import { getObjectContactMomenten } from "../data/contactMomenten.mock";
import { getTakenById } from "../data/taken.mock";
import { getPersoon } from "../data/persoon.mock";
import { cloneDeep } from "lodash-es";
import { getProduct } from "../data/product.mock";
import { getUnopenedBerichten } from "../data/unopened-berichten";
import { getUserDigitaleAdressen } from "../data/userDigitaleAdressen.mock";

const caseId = "82cb13cf-d2f9-4e3e-ac07-751373035ecb";

const cloneZaken = () => {
  const clone = cloneDeep(getZaak);
  if (clone.result.data) {
    clone.result.data.getZaak.documenten = [];
  }
  return clone;
};

const cloneContactmomenten = () => {
  const cloneConctactmomenten = cloneDeep(getObjectContactMomenten);
  if (cloneConctactmomenten.result.data) {
    cloneConctactmomenten.result.data.getUserKlantContacten = [];
  }
  return cloneConctactmomenten;
};

const routes = [
  {
    path: testPaths.cases,
    children: [
      {
        path: testPaths.case(),
        element: <CaseDetailsPage showContactTimeline />,
      },
    ],
  },
];

export const MockCaseDetailsPage = () => (
  <TestProvider
    mocks={[
      getProduct,
      getUnopenedBerichten,
      getZaak,
      getObjectContactMomenten,
      getTakenById,
      getPersoon,
      getUserDigitaleAdressen,
    ]}
    routes={routes}
    initialIndex={2}
    initialEntries={[
      testPaths.overview,
      testPaths.cases,
      testPaths.case(caseId),
    ]}
  ></TestProvider>
);

export const MockCaseDetailsPageWithoutDocuments = () => (
  <TestProvider
    mocks={[
      getProduct,
      getUnopenedBerichten,
      cloneZaken(),
      getObjectContactMomenten,
      getTakenById,
      getPersoon,
    ]}
    routes={routes}
    initialIndex={2}
    initialEntries={[
      testPaths.overview,
      testPaths.cases,
      testPaths.case(caseId),
    ]}
  ></TestProvider>
);

export const MockCaseDetailsPageWithoutContactMoments = () => (
  <TestProvider
    mocks={[
      getProduct,
      getUnopenedBerichten,
      getZaak,
      cloneContactmomenten(),
      getTakenById,
      getPersoon,
    ]}
    routes={routes}
    initialIndex={2}
    initialEntries={[
      testPaths.overview,
      testPaths.cases,
      testPaths.case(caseId),
    ]}
  ></TestProvider>
);
