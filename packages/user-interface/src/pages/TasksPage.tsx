import { FormattedMessage } from "react-intl";
import { TaakV2, useGetTakenV2Query } from "@nl-portal/nl-portal-api";
import TasksList from "../components/TasksList";
import PageHeader from "../components/PageHeader";
import PageGrid from "../components/PageGrid";

const TasksPage = () => {
  const { data, loading, error, refetch } = useGetTakenV2Query({
    variables: { pageSize: 10 },
  });
  const tasks = data?.getTakenV2.content as TaakV2[] | undefined;

  const onPageChange = (index: number) => {
    refetch({ pageNumber: index + 1 });
    return index;
  };

  return (
    <PageGrid>
      <PageHeader title={<FormattedMessage id="pageTitles.tasks" />} />
      <TasksList
        loading={loading}
        error={Boolean(error)}
        titleTranslationId={null}
        tasks={tasks}
        onChange={onPageChange}
        indexLimit={
          data?.getTakenV2.totalPages && data?.getTakenV2.totalPages - 1
        }
      />
    </PageGrid>
  );
};

export default TasksPage;
