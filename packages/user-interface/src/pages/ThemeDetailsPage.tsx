import { useIntl } from "react-intl";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import BackLink from "../components/BackLink";
import { TaakV2, Zaak } from "@nl-portal/nl-portal-api";
import TasksList from "../components/TasksList";
import CasesList from "../components/CasesList";
import ActionsList from "../components/ActionsList";

interface Props {
  slug: string;
  loading?: boolean;
  titleTranslationId?: string;
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
  tasks,
  tasksError,
  links,
  cases,
  casesError,
  children,
}: Props) => {
  const intl = useIntl();

  return (
    <PageGrid>
      <div>
        <BackLink />
        <PageHeader
          loading={loading}
          title={intl.formatMessage({ id: titleTranslationId })}
        />
      </div>
      <TasksList
        loading={loading}
        error={tasksError}
        showEmpty={false}
        titleTranslationId={null}
        tasks={tasks}
      />
      <ActionsList loading={loading} actions={links} />
      <CasesList
        loading={loading}
        error={casesError}
        showEmpty={false}
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
