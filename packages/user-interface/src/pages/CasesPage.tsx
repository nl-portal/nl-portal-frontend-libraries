import { useEffect, useState } from "react";
import Tabs from "@gemeente-denhaag/tab";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate, useLocation } from "react-router-dom";
import CasesList from "../components/CasesList";
import styles from "./CasesPage.module.scss";
import useQuery from "../hooks/useQuery";
import PageHeader from "../components/PageHeader";
import { GetZakenQuery, useGetZakenQuery } from "@nl-portal/nl-portal-api";

const CasesPage = () => {
  const [tabNumber, setTabNumber] = useState(0);
  const intl = useIntl();
  const TAB_QUERY_PARAM = "tab";
  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();
  const queryTab = Number(query.get(TAB_QUERY_PARAM));
  const { data, loading, error } = useGetZakenQuery();

  useEffect(() => {
    if (queryTab === tabNumber) return;
    navigate(`${location.pathname}?${TAB_QUERY_PARAM}=${tabNumber}`);
  }, [tabNumber]);

  useEffect(() => {
    if (queryTab === tabNumber) return;
    setTabNumber(queryTab);
  }, [queryTab]);

  return (
    <section className={styles.cases}>
      <PageHeader title={<FormattedMessage id="pageTitles.cases" />} />
      <Tabs
        tabData={[
          {
            label: intl.formatMessage({ id: "titles.currentCases" }),
            panelContent: (
              <CasesList
                loading={loading}
                error={Boolean(error)}
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
                cases={data?.getZaken.filter(
                  (c) => c.status?.statustype.isEindstatus,
                )}
              />
            ),
          },
        ]}
      />
    </section>
  );
};

export default CasesPage;
