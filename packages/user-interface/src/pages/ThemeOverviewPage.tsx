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
  showTasksLength?: number;
  showCasesLength?: number;
  children?: React.ReactNode;
}

const ThemeOverviewPage = ({
  type,
  loading: loadingProp,
  showTasksLength = 5,
  showCasesLength = 4,
  children,
}: Props) => {
  const intl = useIntl();
  const showTasks = showTasksLength > 0;
  const taskQueryParams = showTasks
    ? { variables: { pageSize: showTasksLength } }
    : { skip: true };
  const {
    data: tasksData,
    loading: taskLoading,
    error: taskError,
  } = useGetTakenQuery(taskQueryParams);
  const {
    data: casesData,
    loading: casesLoading,
    error: casesError,
  } = useGetZakenQuery();

  const loading = loadingProp || taskLoading || casesLoading;
  const tasks = tasksData?.getTaken.content as Taak[] | undefined;
  const cases = casesData?.getZaken.content as Zaak[] | undefined;

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
            tasksData?.getTaken.totalElements > showTasksLength
              ? tasksData?.getTaken.totalElements
              : undefined
          }
        />
      )}
      {showCasesLength && (
        <CasesList
          loading={loading}
          error={Boolean(casesError)}
          listView={false}
          cases={cases
            ?.filter((c) => !c.status?.statustype.isEindstatus)
            .slice(0, showCasesLength)}
          totalAmount={
            casesData?.getZaken.totalElements &&
            casesData?.getZaken.totalElements > showCasesLength
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
