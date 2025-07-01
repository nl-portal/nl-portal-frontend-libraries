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
import { useState, useTransition } from "react";

const CasesPage = () => {
  const intl = useIntl();
  const fetchCasesLength = 10;
  const [currentTab, setCurrentTab] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [openIndex, setOpenIndex] = useState(0);
  const [closedIndex, setClosedIndex] = useState(0);
  const [isPending, startTransition] = useTransition();
  const {
    data: openData,
    loading: openLoading,
    error: openError,
    refetch: openRefetch,
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

  const handleFormSubmit = (searchValue: string) => {
    startTransition(async () => {
      const func = currentTab === 0 ? openRefetch : closedRefetch;
      setOpenIndex(0);
      setClosedIndex(0);
      setSearchValue(searchValue);
      await func({ [searchParam]: searchValue, page: undefined });
    });
  };

  const onTabChange = (index: number) => {
    startTransition(async () => {
      const func = index === 0 ? openRefetch : closedRefetch;
      const pageIndex = index === 0 ? openIndex : closedIndex;
      setCurrentTab(index);
      await func({
        [searchParam]: searchValue,
        page: pageIndex + 1,
      });
    });
  };

  const onPageChange = (index: number) => {
    startTransition(async () => {
      const func = currentTab === 0 ? openRefetch : closedRefetch;
      if (currentTab === 0) setOpenIndex(index);
      if (currentTab === 1) setClosedIndex(index);
      await func({
        page: index + 1,
      });
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
                  loading={isPending || openLoading}
                  error={Boolean(openError)}
                  titleTranslationId={null}
                  cases={openCases}
                  totalAmount={openData?.getZaken.totalElements}
                  index={openIndex}
                  indexLimit={
                    !isPending && openData?.getZaken.totalPages
                      ? openData?.getZaken.totalPages - 1
                      : undefined
                  }
                  onChange={onPageChange}
                />
              ),
            },
            {
              label: intl.formatMessage({ id: "titles.completedCases" }),
              panelContent: (
                <CasesList
                  loading={isPending || closedLoading}
                  error={Boolean(closedError)}
                  titleTranslationId={null}
                  cases={closedCases}
                  totalAmount={closedData?.getZaken.totalElements}
                  index={closedIndex}
                  indexLimit={
                    !isPending && closedData?.getZaken.totalPages
                      ? closedData?.getZaken.totalPages - 1
                      : undefined
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
