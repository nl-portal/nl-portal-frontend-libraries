import { useIntl } from "react-intl";
import CasesList from "../components/CasesList";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import TasksList from "../components/TasksList";
import {
  TaakV2,
  Zaak,
  useGetProductTakenQuery,
  useGetProductZakenQuery,
} from "@nl-portal/nl-portal-api";

interface Props {
  slug: string;
  productType: string;
  loading?: boolean;
  fetchTasksLength?: number;
  fetchCasesLength?: number;
  children?: React.ReactNode;
}

const ThemeOverviewPage = ({
  slug,
  productType,
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
    variables: { productName: productType, pageSize: fetchTasksLength },
    skip: !fetchTasksLength,
  });
  const {
    data: casesData,
    loading: casesLoading,
    error: casesError,
  } = useGetProductZakenQuery({
    variables: {
      productName: productType,
      pageSize: fetchCasesLength,
    },
    skip: !fetchCasesLength,
  });

  const loading = loadingProp || taskLoading || casesLoading;
  const tasks = tasksData?.getProductTaken as TaakV2[] | undefined;
  const cases = casesData?.getProductZaken as Zaak[] | undefined;

  return (
    <PageGrid>
      <PageHeader title={intl.formatMessage({ id: `pageTitles.${slug}` })} />
      {Boolean(fetchTasksLength) && (
        <TasksList
          loading={loading}
          error={Boolean(taskError)}
          showEmpty={false}
          tasks={tasks}
          openInContext={true}
        />
      )}
      {Boolean(fetchCasesLength) && (
        <CasesList
          loading={loading}
          error={Boolean(casesError)}
          showEmpty={false}
          listView={false}
          cases={cases}
        />
      )}
      {children}
    </PageGrid>
  );
};

export default ThemeOverviewPage;
