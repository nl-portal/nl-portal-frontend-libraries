import { FormattedMessage } from "react-intl";
import { TaakV2, useGetTakenV2Query } from "@nl-portal/nl-portal-api";
import TasksList from "../components/TasksList";
import PageHeader from "../components/PageHeader";
import PageGrid from "../components/PageGrid";
import SearchForm from "../components/SearchForm";

const TasksPage = () => {
  const { data, loading, error, refetch } = useGetTakenV2Query();

  const tasks = data?.getTakenV2.content as TaakV2[] | undefined;
  const handleFormSubmit = (searchValue: string) => {
    refetch({ title: searchValue });
  };

  const onPageChange = (index: number) => {
    refetch({ pageNumber: index + 1 });
    return index;
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
