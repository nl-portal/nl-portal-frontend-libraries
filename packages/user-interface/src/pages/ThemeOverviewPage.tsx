import { useIntl } from "react-intl";
import CasesList from "../components/CasesList";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import TasksList from "../components/TasksList";
import { useGetTakenQuery, useGetZakenQuery } from "@nl-portal/nl-portal-api";
import TableList from "../components/TableList";

interface Props {
  type: string;
  showTasksLength?: number;
  showCasesLength?: number;
  children?: React.ReactNode;
}

const ThemeOverviewPage = ({
  type,
  showTasksLength = 3,
  showCasesLength = 4,
  children,
}: Props) => {
  const intl = useIntl();
  const {
    data: taskData,
    loading: taskLoading,
    error: taskError,
  } = useGetTakenQuery({ variables: { pageSize: showTasksLength } });
  const {
    data: caseData,
    loading: caseLoading,
    error: caseError,
  } = useGetZakenQuery();
  const loading = taskLoading || caseLoading;

  return (
    <PageGrid>
      <PageHeader title={intl.formatMessage({ id: `pageTitles.${type}` })} />
      {showTasksLength && (
        <TasksList
          loading={loading}
          error={Boolean(taskError)}
          tasks={taskData?.getTaken.content}
        />
      )}
      {showCasesLength && (
        <CasesList
          loading={loading}
          error={Boolean(caseError)}
          cases={caseData?.getZaken.slice(0, showCasesLength)}
        />
      )}
      <TableList
        loading={loading}
        titleTranslationId="theme.erfpacht.listTitle"
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
