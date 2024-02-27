import { useIntl } from "react-intl";
import CasesList from "../components/CasesList";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import TasksList from "../components/TasksList";
import { useGetTakenQuery, useGetZakenQuery } from "@nl-portal/nl-portal-api";

interface Props {
  titleTranslationKey: string;
  showTasksLength?: number;
  showCasesLength?: number;
}

const ThemeOverviewPage = ({
  titleTranslationKey,
  showTasksLength,
  showCasesLength,
}: Props) => {
  const intl = useIntl();
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
      <PageHeader title={intl.formatMessage({ id: titleTranslationKey })} />
      {showTasksLength && (
        <TasksList
          loading={loading}
          error={Boolean(taskError)}
          title={intl.formatMessage({ id: "thema.tasksTitle" })}
          tasks={taskData?.getTaken.content.slice(0, showTasksLength)}
        />
      )}
      {showCasesLength && (
        <CasesList
          loading={loading}
          error={Boolean(caseError)}
          title={intl.formatMessage({ id: "thema.casesTitle" })}
          cases={caseData?.getZaken.slice(0, showCasesLength)}
        />
      )}
    </PageGrid>
  );
};

export default ThemeOverviewPage;
