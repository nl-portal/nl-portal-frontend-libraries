import { useIntl } from "react-intl";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import BackLink from "../components/BackLink";
import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../contexts/RouterOutletContext";
import {
  Taak,
  Zaak,
  useGetTakenQuery,
  useGetZakenQuery,
} from "@nl-portal/nl-portal-api";
import TasksList from "../components/TasksList";
import CasesList from "../components/CasesList";
import LinksList from "../components/LinksList";
import DocumentsList from "../components/DocumentsList";

interface Props {
  type: string;
  showTasksLength?: number;
  showCasesLength?: number;
}

const ThemeDetailsPage = ({
  type,
  showTasksLength = 5,
  showCasesLength = 4,
}: Props) => {
  const intl = useIntl();
  const { paths } = useOutletContext<RouterOutletContext>();
  const {
    data: tasksData,
    loading: tasksLoading,
    error: tasksError,
  } = useGetTakenQuery();
  const {
    data: casesData,
    loading: casesLoading,
    error: casesError,
  } = useGetZakenQuery();
  const loading = tasksLoading || casesLoading;
  const tasks = tasksData?.getTaken.content as Taak[] | undefined;
  const cases = casesData?.getZaken.content as Zaak[] | undefined;

  return (
    <PageGrid>
      <div>
        <BackLink routePath={paths.themeOverview(type)} />
        <PageHeader title={intl.formatMessage({ id: `pageTitles.${type}` })} />
      </div>
      {showTasksLength && (
        <TasksList
          loading={loading}
          error={Boolean(tasksError)}
          titleTranslationId={null}
          tasks={tasks}
        />
      )}
      <LinksList
        loading={loading}
        links={[
          { title: "Link 1", href: "https://example.com" },
          { title: "Link 2", href: "https://example.com" },
          { title: "Link 3", href: "https://example.com" },
        ]}
      />
      {showCasesLength && (
        <CasesList
          loading={loading}
          error={Boolean(casesError)}
          listView={false}
          cases={cases
            ?.filter((c) => !c.status?.statustype.isEindstatus)
            .slice(0, showCasesLength)}
          readMoreAmount={
            casesData?.getZaken.totalElements &&
            casesData?.getZaken.totalElements > showCasesLength
              ? casesData?.getZaken.totalElements
              : undefined
          }
        />
      )}
      <DocumentsList
        loading={loading}
        error={Boolean(casesError)}
        documents={[]} // TODO: Add documents
      />
      {showTasksLength && (
        <TasksList
          loading={loading}
          error={Boolean(tasksError)}
          titleTranslationId={null}
          tasks={tasks}
        />
      )}
    </PageGrid>
  );
};

export default ThemeDetailsPage;
