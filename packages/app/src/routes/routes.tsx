import {
  AccountPage,
  CasePage,
  CasesPage,
  EditAccountPage,
  NotificationsPage,
  OverviewPage,
  TasksPage,
  TaskPage,
  ThemesPage,
  FormsPage,
  FormPage,
} from "@nl-portal/nl-portal-user-interface";
import { paths } from "../constants/paths";
import { config } from "../constants/config";
import { Navigate } from "react-router-dom";
import { forms } from "../constants/forms";

export const routes = [
  {
    path: "*",
    element: <Navigate to={sessionStorage.getItem("entryUrl") || "/"} />,
  },
  {
    path: paths.overview,
    element: <OverviewPage showIntro showCasesPreview casesPreviewLength={6} />,
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
    path: paths.themes,
    element: <ThemesPage />,
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
