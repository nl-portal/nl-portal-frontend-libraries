import { FormattedMessage } from "react-intl";
import { Taak, useGetTakenQuery } from "@nl-portal/nl-portal-api";
import TasksList from "../components/TasksList";
import PageHeader from "../components/PageHeader";
import PageGrid from "../components/PageGrid";

const TasksPage = () => {
  const { data, loading, error, refetch } = useGetTakenQuery({
    variables: { pageSize: 10 },
  });
  const tasks = data?.getTaken.content as Taak[] | undefined;

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
        indexLimit={data?.getTaken.totalPages && data?.getTaken.totalPages - 1}
      />
    </PageGrid>
  );
};

export default TasksPage;
