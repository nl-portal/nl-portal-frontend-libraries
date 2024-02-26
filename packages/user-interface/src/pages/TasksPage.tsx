import { FormattedMessage } from "react-intl";
import { useGetTakenQuery } from "@nl-portal/nl-portal-api";
import TasksList from "../components/TasksList";
import PageHeader from "../components/PageHeader";
import PageGrid from "../components/PageGrid";

const TasksPage = () => {
  const { data, loading, error } = useGetTakenQuery();

  return (
    <PageGrid>
      <PageHeader title={<FormattedMessage id="pageTitles.tasks" />} />
      <TasksList
        loading={loading}
        error={Boolean(error)}
        tasks={data?.getTaken.content}
      />
    </PageGrid>
  );
};

export default TasksPage;
