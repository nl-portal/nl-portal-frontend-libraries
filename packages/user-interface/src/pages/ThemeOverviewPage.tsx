import { useIntl } from "react-intl";
import CasesList from "../components/CasesList";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import TasksList from "../components/TasksList";
import {
  Taak,
  Zaak,
  useGetTakenQuery,
  useGetZakenQuery,
} from "@nl-portal/nl-portal-api";
import TableList from "../components/TableList";
import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../contexts/RouterOutletContext";

interface Props {
  type: string;
  showTasksLength?: number;
  showCasesLength?: number;
  children?: React.ReactNode;
}

const ThemeOverviewPage = ({
  type,
  showTasksLength = 5,
  showCasesLength = 4,
  children,
}: Props) => {
  const intl = useIntl();
  const { paths } = useOutletContext<RouterOutletContext>();
  const {
    data: tasksData,
    loading: taskLoading,
    error: taskError,
  } = useGetTakenQuery({ variables: { pageSize: showTasksLength } });
  const {
    data: casesData,
    loading: casesLoading,
    error: casesError,
  } = useGetZakenQuery();
  const loading = taskLoading || casesLoading;
  const tasks = tasksData?.getTaken.content as Taak[] | undefined;
  const cases = casesData?.getZaken.content as Zaak[] | undefined;

  return (
    <PageGrid>
      <PageHeader title={intl.formatMessage({ id: `pageTitles.${type}` })} />
      {showTasksLength && (
        <TasksList
          loading={loading}
          error={Boolean(taskError)}
          tasks={tasks}
          readMoreAmount={
            tasksData?.getTaken.totalElements &&
            tasksData?.getTaken.totalElements > showTasksLength
              ? tasksData?.getTaken.totalElements
              : undefined
          }
        />
      )}
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
      <TableList
        loading={loading}
        titleTranslationId="theme.erfpacht.listTitle"
        headers={["Adres", "Kadastrale gegevens", "Contractnummer"]}
        rows={[
          [
            {
              children: "Westerstraat 393 Den Haag",
              href: paths.themeDetails(type, "123"),
            },
            {
              children: "‘s-Gravenhage AF 2679",
              href: paths.themeDetails(type, "123"),
            },
            { children: "78435785", href: paths.themeDetails(type, "123") },
          ],
          [
            {
              children: "Westerstraat 393 Den Haag",
              href: paths.themeDetails(type, "123"),
            },
            {
              children: "‘s-Gravenhage AF 2679",
              href: paths.themeDetails(type, "123"),
            },
            { children: "78435785", href: paths.themeDetails(type, "123") },
          ],
          [
            {
              children: "Westerstraat 393 Den Haag",
              href: paths.themeDetails(type, "123"),
            },
            {
              children: "‘s-Gravenhage AF 2679",
              href: paths.themeDetails(type, "123"),
            },
            { children: "78435785", href: paths.themeDetails(type, "123") },
          ],
        ]}
      />
      {children}
    </PageGrid>
  );
};

export default ThemeOverviewPage;
