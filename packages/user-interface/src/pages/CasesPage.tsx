import Tabs from "@gemeente-denhaag/tab";
import { FormattedMessage, useIntl } from "react-intl";
import CasesList from "../components/CasesList";
import styles from "./CasesPage.module.scss";
import PageHeader from "../components/PageHeader";
import { useGetZakenQuery } from "@nl-portal/nl-portal-api";
import PageGrid from "../components/PageGrid";

const CasesPage = () => {
  const intl = useIntl();
  const { data, loading, error } = useGetZakenQuery();

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
                  showTitle={false}
                  cases={data?.getZaken.filter(
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
                  showTitle={false}
                  cases={data?.getZaken.filter(
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
