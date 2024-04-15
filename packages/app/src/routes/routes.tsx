import {
  AccountPage,
  CasePage,
  CasesPage,
  EditAccountPage,
  NotificationsPage,
  OverviewPage,
  TasksPage,
  TaskPage,
  FormsPage,
  FormPage,
  ThemeDetailsPage,
} from "@nl-portal/nl-portal-user-interface";
import { paths } from "../constants/paths";
import { config } from "../constants/config";
import { Navigate } from "react-router-dom";
import ErfpachtOverviewPage from "../pages/ErfpachtOverviewPage";
import ErfpachtListPage from "../pages/ErfpachtListPage";
import { forms } from "../constants/forms";

export const routes = [
  {
    path: "*",
    element: <Navigate to={sessionStorage.getItem("entryUrl") || "/"} />,
  },
  {
    path: paths.overview,
    element: <OverviewPage showIntro />,
  },
  {
    path: paths.cases,
    children: [
      {
        index: true,
        element: <CasesPage />,
      },
      {
        path: paths.case(),
        element: <CasePage showContactTimeline />,
      },
    ],
  },
  {
    path: paths.tasks,
    children: [
      {
        index: true,
        element: <TasksPage />,
      },
      {
        path: paths.task(),
        element: <TaskPage />,
      },
    ],
  },
  {
    path: paths.notifications,
    element: <NotificationsPage />,
  },
  {
    path: paths.themeOverview("erfpacht"),
    children: [
      {
        index: true,
        element: <ErfpachtOverviewPage />,
      },
      {
        path: paths.themeList("erfpacht"),
        element: <ErfpachtListPage />,
      },
      {
        path: paths.themeDetails("erfpacht"),
        element: <ThemeDetailsPage type="erfpacht" />,
      },
    ],
  },
  {
    path: paths.account,
    children: [
      {
        index: true,
        element: (
          <AccountPage
            showInhabitantAmount={config.SHOW_INHABITANT_AMOUNT}
            addressResearchUrl={config.ADDRESS_RESEARCH_URL}
          />
        ),
      },
      {
        path: paths.editAccount,
        element: <EditAccountPage />,
      },
    ],
  },
  {
    path: paths.forms,
    children: [
      {
        index: true,
        element: <FormsPage forms={forms} />,
      },
      {
        path: paths.form(),
        element: <FormPage forms={forms} />,
      },
    ],
  },
];
