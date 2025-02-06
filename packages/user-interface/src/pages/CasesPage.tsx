import Tabs from "@gemeente-denhaag/tab";
import { FormattedMessage, useIntl } from "react-intl";
import CasesList from "../components/CasesList";
import styles from "./CasesPage.module.scss";
import PageHeader from "../components/PageHeader";
import { Zaak, useGetZakenQuery } from "@nl-portal/nl-portal-api";
import PageGrid from "../components/PageGrid";
import SearchForm from "../components/SearchForm";

const CasesPage = () => {
  const intl = useIntl();
  const fetchCasesLength = 10;
  const { data, loading, error, refetch } = useGetZakenQuery({
    notifyOnNetworkStatusChange: true,
    variables: { isOpen: true, pageSize: fetchCasesLength },
  });
  const cases = data?.getZaken.content as Zaak[] | undefined;

  const handleFormSubmit = (searchValue: string) => {
    refetch({ identificatie: searchValue });
  };

  const onTabChange = (index: number) => {
    if (index === 0) refetch({ isOpen: true });
    if (index === 1) refetch({ isOpen: false });
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
