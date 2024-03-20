import { useIntl } from "react-intl";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import BackLink from "../components/BackLink";
import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../contexts/RouterOutletContext";
import { useGetTakenQuery, useGetZakenQuery } from "@nl-portal/nl-portal-api";
import TasksList from "../components/TasksList";
import CasesList from "../components/CasesList";
import LinksList from "../components/LinksList";
import DocumentsList from "../components/DocumentsList";

interface Props {
  type: string;
}

const ThemeDetailsPage = ({ type }: Props) => {
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

  return (
    <PageGrid>
      <div>
        <BackLink routePath={paths.themeOverview(type)} />
        <PageHeader title={intl.formatMessage({ id: `pageTitles.${type}` })} />
      </div>
      <TasksList
        loading={loading}
        error={Boolean(taskError)}
        tasks={taskData?.getTaken.content}
        showTitle={false}
      />
      <LinksList
        loading={loading}
        links={[
          { title: "Link 1", href: "https://example.com" },
          { title: "Link 2", href: "https://example.com" },
          { title: "Link 3", href: "https://example.com" },
        ]}
      />
      <CasesList
        loading={loading}
        error={Boolean(caseError)}
        cases={caseData?.getZaken.filter(
          (c) => !c.status?.statustype.isEindstatus,
        )}
      />
      <DocumentsList
        loading={loading}
        error={Boolean(caseError)}
        documents={[]} // TODO: Add documents
      />
      <TasksList
        loading={loading}
        error={Boolean(taskError)}
        tasks={taskData?.getTaken.content}
        showTitle={false}
      />
    </PageGrid>
  );
};

export default ThemeDetailsPage;
