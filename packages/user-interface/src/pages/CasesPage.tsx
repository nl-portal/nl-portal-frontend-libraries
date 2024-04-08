import Tabs from "@gemeente-denhaag/tab";
import { FormattedMessage, useIntl } from "react-intl";
import CasesList from "../components/CasesList";
import styles from "./CasesPage.module.scss";
import PageHeader from "../components/PageHeader";
import { Zaak, useGetZakenQuery } from "@nl-portal/nl-portal-api";
import PageGrid from "../components/PageGrid";

const CasesPage = () => {
  const intl = useIntl();
  const { data, loading, error } = useGetZakenQuery();
  const cases = data?.getZaken.content as Zaak[] | undefined;

  return (
    <PageGrid className={styles.cases}>
      <PageHeader title={<FormattedMessage id="pageTitles.cases" />} />
      <div>
        <Tabs
          tabData={[
            {
              label: intl.formatMessage({ id: "titles.currentCases" }),
              panelContent: (
                <CasesList
                  loading={loading}
                  error={Boolean(error)}
                  titleTranslationId={false}
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
                  titleTranslationId={false}
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
