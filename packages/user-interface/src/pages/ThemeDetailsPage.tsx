import { useIntl } from "react-intl";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import BackLink from "../components/BackLink";
import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../interfaces/router-outlet-context";
import { TaakV2, Zaak } from "@nl-portal/nl-portal-api";
import TasksList from "../components/TasksList";
import CasesList from "../components/CasesList";
import LinksList from "../components/LinksList";
import Alert, { AlertProps } from "@gemeente-denhaag/alert";

interface Props {
  slug: string;
  loading?: boolean;
  titleTranslationId?: string;
  alert?: AlertProps;
  tasks?: TaakV2[];
  tasksError?: boolean;
  links?: { title: string; href: string }[];
  cases?: Zaak[];
  casesError?: boolean;
  children?: React.ReactNode;
}

const ThemeDetailsPage = ({
  slug,
  loading,
  titleTranslationId = `pageTitles.${slug}`,
  alert,
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
        <BackLink routePath={paths.themeOverview(slug)} />
        <PageHeader
          loading={loading}
          title={intl.formatMessage({ id: titleTranslationId })}
        />
      </div>
      {alert && <Alert {...alert} />}
      <TasksList
        loading={loading}
        showEmpty={false}
        error={tasksError}
        titleTranslationId={null}
        tasks={tasks}
      />
      <LinksList loading={loading} links={links} />
      <CasesList
        loading={loading}
        error={casesError}
        listView={false}
        cases={cases}
      />
      {children}
      <TasksList
        loading={loading}
        showEmpty={false}
        error={tasksError}
        titleTranslationId={null}
        tasks={tasks}
      />
    </PageGrid>
  );
};

export default ThemeDetailsPage;
