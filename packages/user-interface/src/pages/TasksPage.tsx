import { FormattedMessage } from "react-intl";
import { useGetTakenQuery } from "@nl-portal/nl-portal-api";
import TasksList from "../components/TasksList";
import PageHeader from "../components/PageHeader";
import PageGrid from "../components/PageGrid";

const TasksPage = () => {
  const { data, loading, error, refetch } = useGetTakenQuery({
    variables: { pageSize: 10 },
  });

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
        showTitle={false}
        tasks={data?.getTaken.content}
        onChange={onPageChange}
        indexLimit={
          data?.getTaken.totalPages ? data?.getTaken.totalPages - 1 : undefined
        }
      />
    </PageGrid>
  );
};

export default TasksPage;
