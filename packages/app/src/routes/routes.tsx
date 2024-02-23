import {
  AccountPage,
  CasePage,
  CasesPage,
  EditAccountPage,
  FormsPage,
  NotificationsPage,
  OverviewPage,
  TasksPage,
  TaskPage,
  ThemesPage,
  FormPage,
} from "@nl-portal/nl-portal-user-interface";
import { paths } from "../constants/paths";
import { config } from "../constants/config";
import { Navigate } from "react-router-dom";

export const routes = [
  {
    path: "*",
    element: <Navigate to={sessionStorage.getItem("entryUrl") || "/"} />,
  },
  {
    path: paths.overview,
    element: (
      <OverviewPage
        showIntro="true"
        openFormsFormId={config.OPEN_FORMS_FORM_ID}
        showCasesPreview
        casesPreviewLength={6}
      />
    ),
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
    path: paths.forms,
    children: [
      {
        index: true,
        element: <FormsPage />,
      },
      {
        path: paths.form(),
        element: (
          <FormPage
            openFormsBaseUrl={config.OPEN_FORMS_BASE_URL!}
            openFormsEntryEnv={config.OPEN_FORMS_ENTRY_ENV!}
            openFormsSdkUrl={config.OPEN_FORMS_SDK_URL!}
            openFormsStylesUrl={config.OPEN_FORMS_STYLES_URL!}
          />
        ),
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
];
