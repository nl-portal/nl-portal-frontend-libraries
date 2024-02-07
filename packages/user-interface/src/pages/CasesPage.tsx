import { FC, useEffect, useState } from "react";
import Tabs from "@gemeente-denhaag/tab";
import { FormattedMessage, useIntl } from "react-intl";
import { useNavigate, useLocation } from "react-router-dom";
import CasesList from "../components/CasesList";
import styles from "./CasesPage.module.scss";
import useQuery from "../hooks/useQuery";
import PageHeader from "../components/PageHeader";

interface CasesPageProps {
  showCaseIdentification?: boolean;
}

const CasesPage = ({ showCaseIdentification }: CasesPageProps) => {
  const [tabNumber, setTabNumber] = useState(0);
  const intl = useIntl();
  const TAB_QUERY_PARAM = "tab";
  const location = useLocation();
  const navigate = useNavigate();
  const query = useQuery();
  const queryTab = Number(query.get(TAB_QUERY_PARAM));

  useEffect(() => {
    if (queryTab !== tabNumber) {
      navigate(`${location.pathname}?${TAB_QUERY_PARAM}=${tabNumber}`);
    }
  }, [tabNumber]);

  useEffect(() => {
    if (queryTab && queryTab !== tabNumber) {
      setTabNumber(queryTab);
    }
  }, [queryTab]);

  const tabData = [
    {
      label: intl.formatMessage({ id: "titles.currentCases" }),
      panelContent: (
        <CasesList showCaseIdentification={showCaseIdentification} />
      ),
    },
    {
      label: intl.formatMessage({ id: "titles.completedCases" }),
      panelContent: (
        <CasesList completed showCaseIdentification={showCaseIdentification} />
      ),
    },
  ];

  return (
    <div className={styles.cases}>
      <PageHeader title={<FormattedMessage id="pageTitles.cases" />} />
      <Tabs tabData={tabData} />
    </div>
  );
};

export default CasesPage;
