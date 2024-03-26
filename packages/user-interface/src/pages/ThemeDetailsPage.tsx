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
    data: taskData,
    loading: taskLoading,
    error: taskError,
  } = useGetTakenQuery();
  const {
    data: caseData,
    loading: caseLoading,
    error: caseError,
  } = useGetZakenQuery();
  const loading = taskLoading || caseLoading;
  const tasks = taskData?.getTaken.content as Taak[];
  const cases = caseData?.getZaken.content as Zaak[];

  return (
    <PageGrid>
      <div>
        <BackLink routePath={paths.themeOverview(type)} />
        <PageHeader title={intl.formatMessage({ id: `pageTitles.${type}` })} />
      </div>
      {showTasksLength && (
        <TasksList
          loading={loading}
          error={Boolean(taskError)}
          showTitle={false}
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
          error={Boolean(caseError)}
          cases={cases
            .filter((c) => !c.status?.statustype.isEindstatus)
            .slice(0, showCasesLength)}
          readMoreAmount={
            caseData?.getZaken.totalElements &&
            caseData?.getZaken.totalElements > showCasesLength
              ? caseData?.getZaken.totalElements
              : undefined
          }
        />
      )}
      <DocumentsList
        loading={loading}
        error={Boolean(caseError)}
        documents={[]} // TODO: Add documents
      />
      {showTasksLength && (
        <TasksList
          loading={loading}
          error={Boolean(taskError)}
          showTitle={false}
          tasks={tasks}
        />
      )}
    </PageGrid>
  );
};

export default ThemeDetailsPage;
