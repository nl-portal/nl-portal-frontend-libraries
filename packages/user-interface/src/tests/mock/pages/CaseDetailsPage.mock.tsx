import CaseDetailsPage from "../../../pages/CaseDetailsPage";
import TestProvider, {
  testPaths as paths,
} from "../../../providers/TestProvider";
import { getZaak } from "../data/zaak.mock";
import { getObjectContactMomenten } from "../data/contactMomenten.mock";
import { getTakenById } from "../data/taken.mock";
import { getPersoon } from "../data/persoon.mock";
import cloneDeep from "lodash.clonedeep";

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
    cloneConctactmomenten.result.data.getObjectContactMomenten.content = [];
  }
  return cloneConctactmomenten;
};

const routes = [
  {
    path: paths.cases,
    children: [
      {
        path: paths.case(),
        element: <CaseDetailsPage showContactTimeline />,
      },
    ],
  },
];

export const MockCaseDetailsPage = () => (
  <TestProvider
    mocks={[getZaak, getObjectContactMomenten, getTakenById, getPersoon]}
    routes={routes}
    initialIndex={1}
    initialEntries={[paths.cases, paths.case(caseId)]}
  ></TestProvider>
);

export const MockCaseDetailsPageWithoutDocuments = () => (
  <TestProvider
    mocks={[cloneZaken(), getObjectContactMomenten, getTakenById, getPersoon]}
    routes={routes}
    initialIndex={2}
    initialEntries={[paths.overview, paths.cases, paths.case(caseId)]}
  ></TestProvider>
);

export const MockCaseDetailsPageWithoutContactMoments = () => (
  <TestProvider
    mocks={[getZaak, cloneContactmomenten(), getTakenById, getPersoon]}
    routes={routes}
    initialIndex={2}
    initialEntries={[paths.overview, paths.cases, paths.case(caseId)]}
  ></TestProvider>
);
