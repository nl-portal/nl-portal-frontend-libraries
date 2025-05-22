import Tabs from "@gemeente-denhaag/tab";
import { FormattedMessage, useIntl } from "react-intl";
import CasesList from "../components/CasesList";
import styles from "./CasesPage.module.scss";
import PageHeader from "../components/PageHeader";
import {
  Zaak,
  useGetZakenLazyQuery,
  useGetZakenQuery,
} from "@nl-portal/nl-portal-api";
import PageGrid from "../components/PageGrid";
import SearchForm from "../components/SearchForm";
import { useState } from "react";

const CasesPage = () => {
  const intl = useIntl();
  const fetchCasesLength = 10;
  const [currentTab, setCurrentTab] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [openIndex, setOpenIndex] = useState(0);
  const [closedIndex, setClosedIndex] = useState(0);
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
  const [
    ,
    {
      data: closedData,
      loading: closedLoading,
      error: closedError,
      refetch: closedRefetch,
      fetchMore: closedFetchMore,
    },
  ] = useGetZakenLazyQuery({
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

  const finishRefetching = () => {
    scrollTo(0, 0);
  };

  const handleFormSubmit = (searchValue: string) => {
    const func = currentTab === 0 ? openRefetch : closedRefetch;
    setOpenIndex(0);
    setClosedIndex(0);
    setSearchValue(searchValue);
    func({ [searchParam]: searchValue, page: undefined }).finally(
      finishRefetching,
    );
  };

  const onTabChange = (index: number) => {
    const func = index === 0 ? openRefetch : closedRefetch;
    const pageIndex = index === 0 ? openIndex : closedIndex;
    setCurrentTab(index);
    func({
      [searchParam]: searchValue,
      page: pageIndex + 1,
    });
  };

  const onPageChange = (index: number) => {
    const func = currentTab === 0 ? openFetchMore : closedFetchMore;
    if (currentTab === 0) setOpenIndex(index);
    if (currentTab === 1) setClosedIndex(index);
    func({
      variables: { page: index + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return fetchMoreResult;
      },
    }).finally(finishRefetching);
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
                  loading={openLoading}
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
                  loading={closedLoading}
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
