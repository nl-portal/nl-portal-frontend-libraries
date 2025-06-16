import { useIntl } from "react-intl";
// import CasesList from "../components/CasesList";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
// import TasksList from "../components/TasksList";
// import { TaakV2, Zaak } from "@nl-portal/nl-portal-api";

interface Props {
  slug: string;
  fetchTasksLength?: number;
  fetchCasesLength?: number;
}

const ThemeOverviewPage = ({
  slug,
  // fetchTasksLength = 5,
  // fetchCasesLength = 4,
}: Props) => {
  const intl = useIntl();

  return (
    <PageGrid>
      <PageHeader title={intl.formatMessage({ id: `pageTitles.${slug}` })} />
      {/* {Boolean(fetchTasksLength) && (
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
      )} */}
    </PageGrid>
  );
};

export default ThemeOverviewPage;
