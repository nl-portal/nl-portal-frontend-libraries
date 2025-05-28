import Tabs from "@gemeente-denhaag/tab";
import { FormattedMessage, useIntl } from "react-intl";
import CasesList from "../components/CasesList";
import styles from "./CasesPage.module.scss";
import PageHeader from "../components/PageHeader";
import { Zaak, useGetZakenQuery } from "@nl-portal/nl-portal-api";
import PageGrid from "../components/PageGrid";
import SearchForm from "../components/SearchForm";
import { useState } from "react";

const CasesPage = () => {
  const intl = useIntl();
  const fetchCasesLength = 10;
  const [currentTab, setCurrentTab] = useState(0);
  const [openIndex, setOpenIndex] = useState(0);
  const [closedIndex, setClosedIndex] = useState(0);
  const [refetchingOpen, setRefetchingOpen] = useState(false);
  const [refetchingClosed, setRefetchingClosed] = useState(false);

  const {
    data: openData,
    loading: openLoading,
    error: openError,
    refetch: openRefetch,
    fetchMore: openFetchMore,
  } = useGetZakenQuery({
    variables: {
      isOpen: true,
      pageSize: fetchCasesLength,
    },
  });
  const {
    data: closedData,
    loading: closedLoading,
    error: closedError,
    refetch: closedRefetch,
    fetchMore: closedFetchMore,
  } = useGetZakenQuery({
    variables: {
      isOpen: false,
      pageSize: fetchCasesLength,
    },
  });

  const openCases = openData?.getZaken.content as Zaak[] | undefined;
  const closedCases = closedData?.getZaken.content as Zaak[] | undefined;
  const searchParam = window.CASES_PARTIAL_SEARCH
    ? "identificatieContains"
    : "identificatie";

  const handleFormSubmit = (searchValue: string) => {
    // const func = currentTab === 0 ? openRefetch : closedRefetch;
    setOpenIndex(0);
    setClosedIndex(0);
    setRefetchingOpen(true);
    setRefetchingClosed(true);
    openRefetch({ [searchParam]: searchValue, page: undefined }).finally(() => {
      setRefetchingOpen(false);
      scrollTo(0, 0);
    });
    closedRefetch({ [searchParam]: searchValue, page: undefined }).finally(
      () => {
        setRefetchingClosed(false);
        scrollTo(0, 0);
      },
    );
  };

  const setRefetching = (start: boolean) =>
    currentTab === 0 ? setRefetchingOpen(start) : setRefetchingClosed(start);

  const onTabChange = (index: number) => {
    setCurrentTab(index);
  };

  const onPageChange = (index: number) => {
    const func = currentTab === 0 ? openFetchMore : closedFetchMore;
    if (currentTab === 0) setOpenIndex(index);
    if (currentTab === 1) setClosedIndex(index);
    setRefetching(true);
    func({
      variables: { page: index + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return fetchMoreResult;
      },
    }).finally(() => {
      setRefetching(false);
      scrollTo(0, 0);
    });
  };

  return (
    <PageGrid className={styles.cases} variant="medium">
      <PageHeader title={<FormattedMessage id="pageTitles.cases" />}>
        <SearchForm
          translationId="cases"
          totalElements={null}
          onSubmit={handleFormSubmit}
        />
      </PageHeader>
      <div>
        <Tabs
          onChange={onTabChange}
          tabData={[
            {
              label: intl.formatMessage({ id: "titles.currentCases" }),
              panelContent: (
                <CasesList
                  loading={openLoading || refetchingOpen}
                  error={Boolean(openError)}
                  titleTranslationId={null}
                  cases={openCases}
                  totalAmount={openData?.getZaken.totalElements}
                  index={openIndex}
                  indexLimit={
                    openData?.getZaken.totalPages &&
                    openData?.getZaken.totalPages - 1
                  }
                  onChange={onPageChange}
                />
              ),
            },
            {
              label: intl.formatMessage({ id: "titles.completedCases" }),
              panelContent: (
                <CasesList
                  loading={closedLoading || refetchingClosed}
                  error={Boolean(closedError)}
                  titleTranslationId={null}
                  cases={closedCases}
                  totalAmount={closedData?.getZaken.totalElements}
                  index={closedIndex}
                  indexLimit={
                    closedData?.getZaken.totalPages &&
                    closedData?.getZaken.totalPages - 1
                  }
                  onChange={onPageChange}
                />
              ),
            },
          ]}
        />
      </div>
    </PageGrid>
  );
};

export default CasesPage;
