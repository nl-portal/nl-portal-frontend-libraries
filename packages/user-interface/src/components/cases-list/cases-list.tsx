import * as React from 'react';
import {FC, Fragment, useEffect, useContext} from 'react';
import {FormattedMessage, useIntl} from 'react-intl';
import {Link as RouterLink} from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import {useGetZakenQuery} from '@nl-portal/nl-portal-api';
import {LocaleContext} from '@nl-portal/nl-portal-localization';
import {Heading3, Paragraph} from '@gemeente-denhaag/components-react';
import {CaseCard} from '@gemeente-denhaag/card';
import {Link} from '@gemeente-denhaag/link';
import {ArrowRightIcon} from '@gemeente-denhaag/icons';
import {PortalLink} from '../../utils';
import styles from './cases-list.module.scss';

interface CasesListProps {
  showCaseIdentification?: boolean;
  numElements?: number;
  completed?: boolean;
  showHeader?: boolean;
}

interface CasesListContainerProps {
  numCases: number;
}

const CasesListContainer: FC<CasesListContainerProps> = ({numCases, children}) => {
  const {hrefLang} = useContext(LocaleContext);

  return (
    <div className={styles.cases__container}>
      <div className={styles['cases__container-header']}>
        <Heading3>
          <FormattedMessage id="overview.currentCases" />
        </Heading3>
        {numCases > 0 && (
          <Link
            component={RouterLink}
            to="/zaken"
            icon={<ArrowRightIcon />}
            iconAlign="end"
            hrefLang={hrefLang}
          >
            <FormattedMessage id="overview.showAllCases" />
          </Link>
        )}
      </div>
      {children}
    </div>
  );
};

const CasesList: FC<CasesListProps> = ({
  showCaseIdentification,
  numElements,
  completed,
  showHeader,
}) => {
  const {data, loading, error, refetch} = useGetZakenQuery();
  const intl = useIntl();
  const getCaseUrl = (id: string) => `/zaken/zaak?id=${id}`;

  useEffect(() => {
    refetch();
  }, []);

  const getCaseCards = (): JSX.Element[] => {
    return (
      data?.getZaken
        .filter(zaak => {
          const isEndStatus = zaak?.status?.statustype.isEindstatus;
          return completed ? isEndStatus : !isEndStatus;
        })
        .slice(0, numElements)
        .map(zaak => (
          <div className={styles.cases__card} key={zaak.uuid}>
            <CaseCard
              active={!completed}
              title={intl.formatMessage({id: `case.${zaak.zaaktype.identificatie}.title`})}
              subTitle={showCaseIdentification ? zaak.identificatie : zaak.omschrijving}
              date={new Date(zaak.startdatum)}
              href={getCaseUrl(zaak.uuid)}
              Link={PortalLink}
            />
          </div>
        )) || []
    );
  };

  const getNoDataMessage = () => (
    <Paragraph>
      <FormattedMessage id={completed ? 'cases.noClosedCases' : 'cases.noOpenCases'} />
    </Paragraph>
  );

  const getErrorMessage = () => (
    <Paragraph>
      <FormattedMessage id="cases.fetchError" />
    </Paragraph>
  );

  const getTabContent = (): [JSX.Element | JSX.Element[], number] => {
    const cards = getCaseCards();
    if (error) {
      return [getErrorMessage(), 0];
    }

    return [cards.length > 0 ? cards : getNoDataMessage(), cards.length];
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

  const [tabContent, numCases] = getTabContent();
  const cardList = (
    <div className={styles.cases__cards}>{loading ? getSkeleton() : tabContent}</div>
  );

  return showHeader ? (
    <CasesListContainer numCases={numCases}>{cardList}</CasesListContainer>
  ) : (
    cardList
  );
};

export {CasesList};
