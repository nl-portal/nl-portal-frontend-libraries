import { useIntl } from "react-intl";
import CasesList from "../components/CasesList";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import TasksList from "../components/TasksList";
import {
  Taak,
  Zaak,
  useGetProductTakenQuery,
  useGetProductZakenQuery,
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
  fetchTasksLength = 5,
  fetchCasesLength = 4,
  children,
}: Props) => {
  const intl = useIntl();
  const {
    data: tasksData,
    loading: taskLoading,
    error: taskError,
  } = useGetProductTakenQuery({
    variables: { productName: type, pageSize: fetchTasksLength },
    skip: !fetchTasksLength,
  });
  const {
    data: casesData,
    loading: casesLoading,
    error: casesError,
  } = useGetProductZakenQuery({
    variables: { productName: type, pageSize: fetchCasesLength },
    skip: !fetchCasesLength,
  });

  const loading = loadingProp || taskLoading || casesLoading;
  const tasks = tasksData?.getProductTaken as Taak[] | undefined;
  const cases = casesData?.getProductZaken as Zaak[] | undefined;

  return (
    <PageGrid>
      <PageHeader title={intl.formatMessage({ id: `pageTitles.${type}` })} />
      {fetchTasksLength && (
        <TasksList loading={loading} error={Boolean(taskError)} tasks={tasks} />
      )}
      {fetchCasesLength && (
        <CasesList
          loading={loading}
          error={Boolean(casesError)}
          listView={false}
          cases={cases}
        />
      )}
      {children}
    </PageGrid>
  );
};

export default ThemeOverviewPage;
