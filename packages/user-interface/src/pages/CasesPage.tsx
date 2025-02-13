import Tabs from "@gemeente-denhaag/tab";
import { FormattedMessage, useIntl } from "react-intl";
import CasesList from "../components/CasesList";
import styles from "./CasesPage.module.scss";
import PageHeader from "../components/PageHeader";
import { Zaak, useGetZakenQuery } from "@nl-portal/nl-portal-api";
import PageGrid from "../components/PageGrid";
import SearchForm from "../components/SearchForm";
import { NetworkStatus } from "@apollo/client";
import { useState } from "react";

const CasesPage = () => {
  const intl = useIntl();
  const fetchCasesLength = 10;
  const [refetching, setRefetching] = useState(false);
  const {
    data,
    loading: casesLoading,
    error,
    refetch,
    fetchMore,
    networkStatus,
  } = useGetZakenQuery({
    variables: { isOpen: true, pageSize: fetchCasesLength },
  });

  const cases = data?.getZaken.content as Zaak[] | undefined;
  const loading = casesLoading || refetching;

  const finishRefetching = () => {
    setRefetching(false);
    scrollTo(0, 0);
  };

  const handleFormSubmit = (searchValue: string) => {
    setRefetching(true);
    refetch({ identificatie: searchValue }).finally(finishRefetching);
  };

  const onTabChange = (index: number) => {
    setRefetching(true);
    if (index === 0) refetch({ isOpen: true }).finally(finishRefetching);
    if (index === 1) refetch({ isOpen: false }).finally(finishRefetching);
  };

  const onPageChange = (index: number) => {
    setRefetching(true);
    fetchMore({
      variables: { page: index + 1 },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return fetchMoreResult;
      },
    }).finally(finishRefetching);
  };

  const isFetchingMore = networkStatus === NetworkStatus.fetchMore || undefined;

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
                  loading={loading}
                  error={Boolean(error)}
                  titleTranslationId={null}
                  cases={cases?.filter(
                    (c) => !c.status?.statustype.isEindstatus,
                  )}
                  totalAmount={data?.getZaken.totalElements}
                  indexLimit={
                    data?.getZaken.totalPages && data?.getZaken.totalPages - 1
                  }
                  onChange={onPageChange}
                  listView={isFetchingMore}
                />
              ),
            },
            {
              label: intl.formatMessage({ id: "titles.completedCases" }),
              panelContent: (
                <CasesList
                  loading={loading}
                  error={Boolean(error)}
                  titleTranslationId={null}
                  cases={cases?.filter(
                    (c) => c.status?.statustype.isEindstatus,
                  )}
                  totalAmount={data?.getZaken.totalElements}
                  indexLimit={
                    data?.getZaken.totalPages && data?.getZaken.totalPages - 1
                  }
                  onChange={onPageChange}
                  listView={isFetchingMore}
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
