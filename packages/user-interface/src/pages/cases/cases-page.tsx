import * as React from 'react';
import {FC, Fragment, useEffect, useState} from 'react';
import {
  Heading2,
  Card,
  Tabs,
  Tab,
  TabContext,
  TabPanel,
  Paragraph,
} from '@gemeente-denhaag/components-react';
import {FormattedMessage, useIntl} from 'react-intl';
import {useHistory, useLocation} from 'react-router-dom';
import {useGetZakenQuery} from '@nl-portal/nl-portal-api';
import Skeleton from 'react-loading-skeleton';
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
  const getCaseUrl = (id: string) => `/zaken/zaak?id=${id}`;
  const TAB_QUERY_PARAM = 'tab';
  const location = useLocation();
  const history = useHistory();
  const query = useQuery();
  const queryTab = Number(query.get(TAB_QUERY_PARAM));
  const {data, loading, error, refetch} = useGetZakenQuery();

  const getCaseCards = (completed: boolean) =>
    data?.getZaken
      .filter(zaak => {
        const isEndStatus = zaak?.status?.statustype.isEindstatus;
        return completed ? isEndStatus : !isEndStatus;
      })
      .map(zaak => (
        <div className={styles.cases__card} key={zaak.uuid}>
          <Card
            archived={completed}
            variant="case"
            title={intl.formatMessage({id: `case.${zaak.zaaktype.identificatie}.title`})}
            subTitle={showCaseIdentification ? zaak.identificatie : zaak.omschrijving}
            date={new Date(zaak.startdatum)}
            onClick={() => history.push(getCaseUrl(zaak.uuid))}
          />
        </div>
      )) || [];

  const getNoDataMessage = (completed: boolean) => (
    <Paragraph>
      <FormattedMessage id={completed ? 'cases.noClosedCases' : 'cases.noOpenCases'} />
    </Paragraph>
  );

  const getErrorMessage = () => (
    <Paragraph>
      <FormattedMessage id="cases.fetchError" />
    </Paragraph>
  );

  const getTabContent = (completed: boolean) => {
    const cards = getCaseCards(completed);
    if (error) {
      return getErrorMessage();
    }
    return cards.length > 0 ? cards : getNoDataMessage(completed);
  };

  const getSkeleton = () => {
    const getSkeletonCard = (key: number) => (
      <div
        className={styles.cases__card}
        key={key}
        aria-busy
        aria-disabled
        aria-label={intl.formatMessage({id: 'element.loading'})}
      >
        <Skeleton height={220} />
      </div>
    );

    return (
      <Fragment>
        {getSkeletonCard(0)}
        {getSkeletonCard(1)}
      </Fragment>
    );
  };

  useEffect(() => {
    refetch();
  }, []);

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
          <div className={styles.cases__cards}>
            {loading ? getSkeleton() : getTabContent(false)}
          </div>
        </TabPanel>
        <TabPanel value="1">
          <div className={styles.cases__cards}>{loading ? getSkeleton() : getTabContent(true)}</div>
        </TabPanel>
      </TabContext>
    </section>
  );
};

export {CasesPage};
