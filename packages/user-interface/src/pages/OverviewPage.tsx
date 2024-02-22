import { Alert } from "@gemeente-denhaag/alert";
import { FormattedMessage, useIntl } from "react-intl";
import { useUserInfo } from "../hooks/useUserInfo";
import CasesList from "../components/CasesList";
import PageHeader from "../components/PageHeader";
import { useGetTakenQuery } from "@nl-portal/nl-portal-api";
import TasksList from "../components/TasksList";

interface OverviewPageProps {
  showAlert?: boolean;
  alertType?: "error" | "info" | "success" | "warning";
  showIntro?: boolean;
  showTasksPreview?: boolean;
  showCasesPreview?: boolean;
  casesPreviewLength?: number;
}

const OverviewPage = ({
  showAlert = false,
  alertType = "warning",
  showIntro = false,
  showTasksPreview = false,
  showCasesPreview = false,
  casesPreviewLength = 6,
}: OverviewPageProps) => {
  const intl = useIntl();
  const { userName, volmachtgever, isVolmachtLogin } = useUserInfo();
  const { data, loading, error } = useGetTakenQuery();

  return (
    <>
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
          error={Boolean(error)}
          title={intl.formatMessage({ id: "overview.tasksTitle" })}
          tasks={data?.getTaken.content}
        />
      )}
      {showCasesPreview && (
        <CasesList showHeader numElements={casesPreviewLength} />
      )}
    </>
  );
};

export default OverviewPage;
