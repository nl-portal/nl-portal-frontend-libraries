import { useIntl } from "react-intl";
import CasesList from "../components/CasesList";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import TasksList from "../components/TasksList";
import {
  Taak,
  Zaak,
  useGetTakenQuery,
  useGetZakenQuery,
} from "@nl-portal/nl-portal-api";

interface Props {
  type: string;
  loading?: boolean;
  showTasks?: boolean;
  fetchTasksLength?: number;
  showCases?: boolean;
  fetchCasesLength?: number;
  children?: React.ReactNode;
}

const ThemeOverviewPage = ({
  type,
  loading: loadingProp,
  showTasks = true,
  fetchTasksLength = showTasks ? 5 : 0,
  showCases = true,
  fetchCasesLength = showCases ? 4 : 0,
  children,
}: Props) => {
  const intl = useIntl();
  const {
    data: tasksData,
    loading: taskLoading,
    error: taskError,
  } = useGetTakenQuery({
    variables: { pageSize: fetchTasksLength },
    skip: !fetchTasksLength,
  });
  const {
    data: casesData,
    loading: casesLoading,
    error: casesError,
  } = useGetZakenQuery({ skip: !fetchCasesLength });

  const loading = loadingProp || taskLoading || casesLoading;
  const tasks = tasksData?.getTaken.content as Taak[] | undefined;
  const cases = casesData?.getZaken.content
    ?.filter((c) => !c.status?.statustype.isEindstatus)
    .slice(0, fetchCasesLength) as Zaak[] | undefined;

  return (
    <PageGrid>
      <PageHeader title={intl.formatMessage({ id: `pageTitles.${type}` })} />
      {showTasks && (
        <TasksList
          loading={loading}
          error={Boolean(taskError)}
          tasks={tasks}
          totalAmount={
            tasksData?.getTaken.totalElements &&
            tasksData?.getTaken.totalElements > fetchTasksLength
              ? tasksData?.getTaken.totalElements
              : undefined
          }
        />
      )}
      {fetchCasesLength && (
        <CasesList
          loading={loading}
          error={Boolean(casesError)}
          listView={false}
          cases={cases}
          totalAmount={
            casesData?.getZaken.totalElements &&
            casesData?.getZaken.totalElements > fetchCasesLength
              ? casesData?.getZaken.totalElements
              : undefined
          }
        />
      )}
      {children}
    </PageGrid>
  );
};

export default ThemeOverviewPage;
