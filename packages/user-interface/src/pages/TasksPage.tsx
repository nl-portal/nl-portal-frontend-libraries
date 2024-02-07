import { FormattedMessage } from "react-intl";
import { useGetTakenQuery } from "@nl-portal/nl-portal-api";
import TasksList from "../components/TasksList";
import PageHeader from "../components/PageHeader";

const TasksPage = () => {
  const { data, loading, error } = useGetTakenQuery();

  return (
    <>
      <PageHeader title={<FormattedMessage id="pageTitles.tasks" />} />
      <TasksList
        loading={loading}
        error={Boolean(error)}
        tasks={data?.getTaken.content}
      />
    </>
  );
};

export default TasksPage;
