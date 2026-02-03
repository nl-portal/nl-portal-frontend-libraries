import { FormattedMessage } from "react-intl";
import { GetTakenV2Document, TaakV2 } from "@nl-portal/nl-portal-api";
import { useQuery } from "@apollo/client/react";
import TasksList from "../components/TasksList";
import PageHeader from "../components/PageHeader";
import PageGrid from "../components/PageGrid";
import SearchForm from "../components/SearchForm";

const TasksPage = () => {
  const { data, loading, error, refetch } = useQuery(GetTakenV2Document);
  const tasks = data?.getTakenV2.content as TaakV2[] | undefined;

  const handleFormSubmit = (searchValue: string) => {
    try {
      refetch({ title: searchValue });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const onPageChange = (index: number) => {
    try {
      refetch({ pageNumber: index + 1 });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return (
    <PageGrid>
      <PageHeader title={<FormattedMessage id="pageTitles.tasks" />}>
        <SearchForm
          translationId="tasks"
          totalElements={data?.getTakenV2.totalElements ?? 0}
          onSubmit={handleFormSubmit}
        />
      </PageHeader>
      <TasksList
        loading={loading}
        error={Boolean(error)}
        titleTranslationId={null}
        tasks={tasks}
        onChange={onPageChange}
        openInContext={true}
      />
    </PageGrid>
  );
};

export default TasksPage;
