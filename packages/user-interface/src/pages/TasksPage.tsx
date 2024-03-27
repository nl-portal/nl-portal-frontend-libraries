import { FormattedMessage } from "react-intl";
import { useGetTakenQuery } from "@nl-portal/nl-portal-api";
import TasksList from "../components/TasksList";
import PageHeader from "../components/PageHeader";
import PageGrid from "../components/PageGrid";
import { Taak } from "@nl-portal/nl-portal-api";

const TasksPage = () => {
  const { data, loading, error } = useGetTakenQuery();
  const tasksData = data?.getTaken.content as Taak[] | undefined;

  return (
    <PageGrid>
      <PageHeader title={<FormattedMessage id="pageTitles.tasks" />} />
      <TasksList
        loading={loading}
        error={Boolean(error)}
        tasks={tasksData}
        showTitle={false}
      />
    </PageGrid>
  );
};

export default TasksPage;
