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

interface Props {
  type: string;
  loading?: boolean;
  error?: boolean;
  titleTranslationId?: string;
  showTasks?: boolean;
  tasks?: Taak[];
  fetchTasksLength?: number;
  links?: { title: string; href: string }[];
  showCases?: boolean;
  cases?: Zaak[];
  fetchCasesLength?: number;
  children?: React.ReactNode;
}

const ThemeDetailsPage = ({
  type,
  loading: loadingProp,
  error: errorProp,
  titleTranslationId = `pageTitles.${type}`,
  showTasks = true,
  tasks: tasksProp,
  fetchTasksLength = showTasks ? 5 : 0,
  links,
  showCases = true,
  cases: casesProp,
  fetchCasesLength = showCases ? 4 : 0,
  children,
}: Props) => {
  const intl = useIntl();
  const { paths } = useOutletContext<RouterOutletContext>();
  const {
    data: tasksData,
    loading: tasksLoading,
    error: tasksError,
  } = useGetTakenQuery({
    variables: { pageSize: fetchTasksLength },
    skip: !fetchTasksLength,
  });
  const {
    data: casesData,
    loading: casesLoading,
    error: casesError,
  } = useGetZakenQuery({ skip: !fetchCasesLength });
  const loading = loadingProp || tasksLoading || casesLoading;
  const tasks =
    tasksProp || (tasksData?.getTaken.content as Taak[] | undefined);
  const cases =
    casesProp ||
    (casesData?.getZaken.content
      ?.filter((c) => !c.status?.statustype.isEindstatus)
      .slice(0, fetchCasesLength) as Zaak[] | undefined);

  return (
    <PageGrid>
      <div>
        <BackLink routePath={paths.themeOverview(type)} />
        <PageHeader
          loading={loading}
          title={intl.formatMessage({ id: titleTranslationId })}
        />
      </div>
      {showTasks && (
        <TasksList
          loading={loading}
          showEmpty={false}
          error={errorProp || Boolean(tasksError)}
          titleTranslationId={null}
          tasks={tasks}
        />
      )}
      {links && <LinksList loading={loading} links={links} />}
      {showCases && (
        <CasesList
          loading={loading}
          error={errorProp || Boolean(casesError)}
          listView={false}
          cases={cases}
        />
      )}
      {children}
      {showTasks && (
        <TasksList
          loading={loading}
          showEmpty={false}
          error={errorProp || Boolean(tasksError)}
          titleTranslationId={null}
          tasks={tasks}
        />
      )}
    </PageGrid>
  );
};

export default ThemeDetailsPage;
