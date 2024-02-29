import { useIntl } from "react-intl";
import CasesList from "../components/CasesList";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import TasksList from "../components/TasksList";
import { useGetTakenQuery, useGetZakenQuery } from "@nl-portal/nl-portal-api";
import TableList from "../components/TableList";

// TODO: more tasks link with filter parameters

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
  } = useGetTakenQuery();
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
          title={intl.formatMessage({ id: `theme.${type}.tasksTitle` })}
          tasks={taskData?.getTaken.content.slice(0, showTasksLength)}
        />
      )}
      {showCasesLength && (
        <CasesList
          loading={loading}
          error={Boolean(caseError)}
          title={intl.formatMessage({ id: `theme.${type}.casesTitle` })}
          cases={caseData?.getZaken.slice(0, showCasesLength)}
        />
      )}
      <TableList
        loading={loading}
        title={intl.formatMessage({ id: `theme.${type}.listTitle` })}
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
