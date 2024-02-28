import { useIntl } from "react-intl";
import CasesList from "../components/CasesList";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import TasksList from "../components/TasksList";
import { useGetTakenQuery, useGetZakenQuery } from "@nl-portal/nl-portal-api";
import TableList from "../components/TableList";

interface Props {
  titleTranslationKey: string;
  showTasksLength?: number;
  showCasesLength?: number;
  children?: React.ReactNode;
}

const ThemeOverviewPage = ({
  titleTranslationKey,
  showTasksLength,
  showCasesLength,
  children,
}: Props) => {
  const intl = useIntl();
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
      <PageHeader title={intl.formatMessage({ id: titleTranslationKey })} />
      {showTasksLength && (
        <TasksList
          loading={loading}
          error={Boolean(taskError)}
          // TODO: translate
          title={intl.formatMessage({ id: "thema.tasksTitle" })}
          tasks={taskData?.getTaken.content.slice(0, showTasksLength)}
        />
      )}
      {showCasesLength && (
        <CasesList
          loading={loading}
          error={Boolean(caseError)}
          // TODO: translate
          title={intl.formatMessage({ id: "thema.casesTitle" })}
          cases={caseData?.getZaken.slice(0, showCasesLength)}
        />
      )}
      <TableList
        loading={loading}
        title="Erfpachtcontracten"
        headers={["Adres", "Kadastrale gegevens", "Contractnummer"]}
        rows={[
          [
            { children: "Westerstraat 393 Den Haag", href: "/test" },
            { children: "‘s-Gravenhage AF 2679", href: "/test" },
            { children: "78435785", href: "/test" },
          ],
          [
            { children: "Westerstraat 393 Den Haag", href: "/test" },
            { children: "‘s-Gravenhage AF 2679", href: "/test" },
            { children: "78435785", href: "/test" },
          ],
          [
            { children: "Westerstraat 393 Den Haag", href: "/test" },
            { children: "‘s-Gravenhage AF 2679", href: "/test" },
            { children: "78435785", href: "/test" },
          ],
        ]}
      />
      {children}
    </PageGrid>
  );
};

export default ThemeOverviewPage;
