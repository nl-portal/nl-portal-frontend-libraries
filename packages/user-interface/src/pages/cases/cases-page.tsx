import { FC, useEffect, useState } from "react";
import { Heading2 } from "@gemeente-denhaag/components-react";
import Tabs from "@gemeente-denhaag/tab";
import { FormattedMessage, useIntl } from "react-intl";
import { useHistory, useLocation } from "react-router-dom";
import { CasesList } from "../../components/cases-list";
import styles from "./cases-page.module.scss";
import { useQuery } from "../../hooks";

interface CasesPageProps {
  showCaseIdentification?: boolean;
}

const CasesPage: FC<CasesPageProps> = ({ showCaseIdentification }) => {
  const [tabNumber, setTabNumber] = useState(0);
  const intl = useIntl();
  const TAB_QUERY_PARAM = "tab";
  const location = useLocation();
  const history = useHistory();
  const query = useQuery();
  const queryTab = Number(query.get(TAB_QUERY_PARAM));

  useEffect(() => {
    if (queryTab !== tabNumber) {
      history.push(`${location.pathname}?${TAB_QUERY_PARAM}=${tabNumber}`);
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
    <section className={styles.cases}>
      <header className={styles.cases__header}>
        <Heading2>
          <FormattedMessage id="pageTitles.cases" />
        </Heading2>
      </header>
      <Tabs tabData={tabData} />
    </section>
  );
};

export { CasesPage };
