import Tabs from "@gemeente-denhaag/tab";
import { FormattedMessage, useIntl } from "react-intl";
import CasesList from "../components/CasesList";
import styles from "./CasesPage.module.scss";
import PageHeader from "../components/PageHeader";
import { Zaak, useGetZakenQuery } from "@nl-portal/nl-portal-api";
import PageGrid from "../components/PageGrid";
import SearchForm from "../components/SearchForm";
import { useMemo, useState } from "react";

const fetchCasesLength = 4;

const queryOptions = (isOpen: boolean) => ({
  variables: { isOpen, pageSize: fetchCasesLength },
});

const CasesPage = () => {
  const intl = useIntl();

  // Tabs state
  const [{ currentTab, pageIndices, refetching }, setTabsState] = useState({
    currentTab: 0,
    pageIndices: [0, 0],
    refetching: [false, false],
  });

  // GraphQL queries
  const [
    {
      data: openData,
      loading: openLoad,
      error: openErr,
      refetch: openRefetch,
      fetchMore: openMore,
    },
    {
      data: closedData,
      loading: closedLoad,
      error: closedErr,
      refetch: closedRefetch,
      fetchMore: closedMore,
    },
  ] = [
    useGetZakenQuery(queryOptions(true)),
    useGetZakenQuery(queryOptions(false)),
  ];

  // Mapping GraphQL query results to array for Tabs
  const sources = useMemo(
    () => [
      {
        data: openData,
        loading: openLoad,
        error: openErr,
        refetch: openRefetch,
        fetchMore: openMore,
      },
      {
        data: closedData,
        loading: closedLoad,
        error: closedErr,
        refetch: closedRefetch,
        fetchMore: closedMore,
      },
    ],
    [openData, openLoad, openErr, closedData, closedLoad, closedErr],
  );

  const searchKey = window.CASES_PARTIAL_SEARCH
    ? "identificatieContains"
    : "identificatie";

  const handleSearch = (value: string) => {
    // Reset pagination, enable refetching loading state
    setTabsState((s) => ({
      ...s,
      pageIndices: [0, 0],
      refetching: [true, true],
    }));

    // Refetch both tabs
    sources.forEach(({ refetch }, idx) =>
      refetch({ [searchKey]: value, page: undefined }).finally(() =>
        // Disable refetching loading state
        setTabsState((s) => {
          const refetching = [...s.refetching];
          refetching[idx] = false;
          return { ...s, refetching };
        }),
      ),
    );
  };

  const handlePageChange = (page: number) => {
    const { fetchMore } = sources[currentTab];

    setTabsState((s) => {
      const nextRefetching = [...s.refetching]; // Copy array
      nextRefetching[currentTab] = true; // Edit copy
      const nextIndices = [...s.pageIndices];
      nextIndices[currentTab] = page;
      return { ...s, pageIndices: nextIndices, refetching: nextRefetching };
    });

    fetchMore({
      variables: { page: page + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return fetchMoreResult;
      },
    }).finally(() =>
      setTabsState((s) => {
        const nextRefetching = [...s.refetching];
        nextRefetching[currentTab] = false;
        return { ...s, refetching: nextRefetching };
      }),
    );
  };

  const tabs = [
    { labelId: "titles.currentCases" },
    { labelId: "titles.completedCases" },
  ].map((tab, i) => {
    const { data, loading, error } = sources[i];
    const zaakList = data?.getZaken;
    return {
      label: intl.formatMessage({ id: tab.labelId }),
      panelContent: (
        <CasesList
          loading={loading || refetching[i]}
          error={Boolean(error)}
          titleTranslationId={null}
          cases={zaakList?.content as Zaak[]}
          totalAmount={zaakList?.totalElements}
          index={pageIndices[i]}
          indexLimit={(zaakList?.totalPages ?? 1) - 1}
          onChange={handlePageChange}
        />
      ),
    };
  });

  return (
    <PageGrid className={styles.cases} variant="medium">
      <PageHeader title={<FormattedMessage id="pageTitles.cases" />}>
        <SearchForm
          translationId="cases"
          totalElements={null}
          onSubmit={handleSearch}
        />
      </PageHeader>
      <div>
        <Tabs
          onChange={(idx) => setTabsState((s) => ({ ...s, currentTab: idx }))}
          tabData={tabs}
        />
      </div>
    </PageGrid>
  );
};

export default CasesPage;
