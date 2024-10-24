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
  const { data, loading, error, refetch } = useGetZakenQuery();
  const cases = data?.getZaken.content as Zaak[] | undefined;

  const handleFormSubmit = (searchValue: string) => {
    refetch({ identificatie: searchValue });
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
          tabData={[
            {
              label: intl.formatMessage({ id: "titles.currentCases" }),
              panelContent: (
                <CasesList
                  loading={loading}
                  error={Boolean(error)}
                  titleTranslationId={null}
                  totalAmount={data?.getZaken.totalElements}
                  cases={cases?.filter(
                    (c) => !c.status?.statustype.isEindstatus,
                  )}
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
                  totalAmount={data?.getZaken.totalElements}
                  cases={cases?.filter(
                    (c) => c.status?.statustype.isEindstatus,
                  )}
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
