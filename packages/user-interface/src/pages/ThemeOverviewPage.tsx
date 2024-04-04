import { useIntl } from "react-intl";
import CasesList from "../components/CasesList";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import TasksList from "../components/TasksList";
import {
  Taak,
  Zaak,
  ContractBeperkt,
  useGetTakenQuery,
  useGetZakenQuery,
  useGetErfpachtContractenQuery,
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
  const {
    data: contractsData,
    loading: contractsLoading,
    error: contractsError,
  } = useGetErfpachtContractenQuery();
  const loading = taskLoading || casesLoading || contractsLoading;
  const tasks = tasksData?.getTaken.content as Taak[] | undefined;
  const cases = casesData?.getZaken.content as Zaak[] | undefined;
  const contracts = contractsData?.getErfpachtContracten.content as
    | ContractBeperkt[]
    | undefined;

  console.log(contracts);

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
        error={Boolean(contractsError)}
        titleTranslationId={`theme.${type}.listTitle`}
        headers={["Adres", "Contractnummer"]}
        rows={contracts?.map((contract) => {
          const href = paths.themeDetails(type, contract.id);
          const { straatnaam, huisnummer, woonplaats } = contract.adressen[0];
          return [
            { children: `${straatnaam} ${huisnummer} ${woonplaats}`, href },
            { children: contract.id, href },
          ];
        })}
        // rows={[
        //   [
        //     {
        //       children: "Westerstraat 393 Den Haag",
        //       href: paths.themeDetails(type, "123"),
        //     },
        //     {
        //       children: "‘s-Gravenhage AF 2679",
        //       href: paths.themeDetails(type, "123"),
        //     },
        //     { children: "78435785", href: paths.themeDetails(type, "123") },
        //   ],
        //   [
        //     {
        //       children: "Westerstraat 393 Den Haag",
        //       href: paths.themeDetails(type, "123"),
        //     },
        //     {
        //       children: "‘s-Gravenhage AF 2679",
        //       href: paths.themeDetails(type, "123"),
        //     },
        //     { children: "78435785", href: paths.themeDetails(type, "123") },
        //   ],
        //   [
        //     {
        //       children: "Westerstraat 393 Den Haag",
        //       href: paths.themeDetails(type, "123"),
        //     },
        //     {
        //       children: "‘s-Gravenhage AF 2679",
        //       href: paths.themeDetails(type, "123"),
        //     },
        //     { children: "78435785", href: paths.themeDetails(type, "123") },
        //   ],
        // ]}
      />
      {children}
    </PageGrid>
  );
};

export default ThemeOverviewPage;
