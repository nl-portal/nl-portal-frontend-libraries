import { useIntl } from "react-intl";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import BackLink from "../components/BackLink";
import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../contexts/RouterOutletContext";
import { Taak, Zaak } from "@nl-portal/nl-portal-api";
import TasksList from "../components/TasksList";
import CasesList from "../components/CasesList";
import LinksList from "../components/LinksList";

interface Props {
  type: string;
  loading?: boolean;
  titleTranslationId?: string;
  tasks?: Taak[];
  tasksError?: boolean;
  links?: { title: string; href: string }[];
  cases?: Zaak[];
  casesError?: boolean;
  children?: React.ReactNode;
}

const ThemeDetailsPage = ({
  type,
  loading,
  titleTranslationId = `pageTitles.${type}`,
  tasks,
  tasksError,
  links,
  cases,
  casesError,
  children,
}: Props) => {
  const intl = useIntl();
  const { paths } = useOutletContext<RouterOutletContext>();

  return (
    <PageGrid>
      <div>
        <BackLink routePath={paths.themeOverview(type)} />
        <PageHeader
          loading={loading}
          title={intl.formatMessage({ id: titleTranslationId })}
        />
      </div>
      {tasks && (
        <TasksList
          loading={loading}
          showEmpty={false}
          error={tasksError}
          titleTranslationId={null}
          tasks={tasks}
        />
      )}
      {links && <LinksList loading={loading} links={links} />}
      {cases && (
        <CasesList
          loading={loading}
          error={casesError}
          listView={false}
          cases={cases}
        />
      )}
      {children}
      {tasks && (
        <TasksList
          loading={loading}
          showEmpty={false}
          error={tasksError}
          titleTranslationId={null}
          tasks={tasks}
        />
      )}
    </PageGrid>
  );
};

export default ThemeDetailsPage;
