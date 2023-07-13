import * as React from 'react';
import {FC, useEffect, useState} from 'react';
import {Heading2, Tabs, Tab, TabContext, TabPanel} from '@gemeente-denhaag/components-react';
import {FormattedMessage, useIntl} from 'react-intl';
import {useHistory, useLocation} from 'react-router-dom';
import {CasesList} from '../../components/cases-list';
import styles from './cases-page.module.scss';
import {useMediaQuery, useQuery} from '../../hooks';
import {BREAKPOINTS} from '../../constants';

interface CasesPageProps {
  showCaseIdentification?: boolean;
}

const CasesPage: FC<CasesPageProps> = ({showCaseIdentification}) => {
  const [tabNumber, setTabNumber] = useState(0);
  const intl = useIntl();
  const isTablet = useMediaQuery(BREAKPOINTS.TABLET);
  const TAB_QUERY_PARAM = 'tab';
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

  return (
    <section className={styles.cases}>
      <header className={styles.cases__header}>
        <Heading2>
          <FormattedMessage id="pageTitles.cases" />
        </Heading2>
      </header>
      <TabContext value={tabNumber.toString()}>
        <Tabs
          variant={isTablet ? 'standard' : 'fullWidth'}
          value={tabNumber}
          onChange={(_event: React.ChangeEvent<unknown>, newValue: number) => {
            setTabNumber(newValue);
          }}
        >
          <Tab label={intl.formatMessage({id: 'titles.currentCases'})} value={0} />
          <Tab label={intl.formatMessage({id: 'titles.completedCases'})} value={1} />
        </Tabs>
        <TabPanel value="0">
          <CasesList showCaseIdentification={showCaseIdentification} />
        </TabPanel>
        <TabPanel value="1">
          <CasesList completed showCaseIdentification={showCaseIdentification} />
        </TabPanel>
      </TabContext>
    </section>
  );
};

export {CasesPage};
