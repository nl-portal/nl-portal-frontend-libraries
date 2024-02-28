import { Alert } from "@gemeente-denhaag/alert";
import { FormattedMessage, useIntl } from "react-intl";
import { useUserInfo } from "../hooks/useUserInfo";
import CasesList from "../components/CasesList";
import PageHeader from "../components/PageHeader";
import { useGetTakenQuery, useGetZakenQuery } from "@nl-portal/nl-portal-api";
import TasksList from "../components/TasksList";
import PageGrid from "../components/PageGrid";

interface OverviewPageProps {
  showAlert?: boolean;
  alertType?: "error" | "info" | "success" | "warning";
  showIntro?: boolean;
  showTasksPreview?: boolean;
  showCasesPreview?: boolean;
  tasksPreviewLength?: number;
  casesPreviewLength?: number;
}

const OverviewPage = ({
  showAlert = false,
  alertType = "warning",
  showIntro = false,
  showTasksPreview = false,
  showCasesPreview = false,
  tasksPreviewLength = 4,
  casesPreviewLength = 4,
}: OverviewPageProps) => {
  const intl = useIntl();
  const { userName, volmachtgever, isVolmachtLogin } = useUserInfo();
  const {
    data: taskData,
    loading: taskLoading,
    error: taskError,
  } = useGetTakenQuery();
  const {
    data: caseData,
    loading: caseLoading,
    error: caseError,
  } = useGetZakenQuery();
  const loading = taskLoading || caseLoading;

  return (
    <PageGrid>
      {showAlert && (
        <Alert
          variant={alertType}
          title={intl.formatMessage({ id: "overview.alertTitle" })}
          text={intl.formatMessage({ id: "overview.alertText" })}
        />
      )}
      {showIntro && (
        <PageHeader
          title={
            <FormattedMessage id="overviewpage.title" values={{ userName }} />
          }
          subTitle={
            isVolmachtLogin && (
              <FormattedMessage
                id="overview.subTitle"
                values={{ volmachtgever }}
              />
            )
          }
        >
          <FormattedMessage id="overviewpage.paragraph" />
        </PageHeader>
      )}
      {showTasksPreview && (
        <TasksList
          loading={loading}
          error={Boolean(taskError)}
          title={intl.formatMessage({ id: "overview.tasksTitle" })}
          tasks={taskData?.getTaken.content.slice(0, tasksPreviewLength)}
        />
      )}
      {showCasesPreview && (
        <CasesList
          loading={loading}
          error={Boolean(caseError)}
          title={intl.formatMessage({ id: "overview.casesTitle" })}
          cases={caseData?.getZaken.slice(0, casesPreviewLength)}
        />
      )}
    </PageGrid>
  );
};

export default OverviewPage;
