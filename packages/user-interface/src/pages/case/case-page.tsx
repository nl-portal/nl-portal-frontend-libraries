import * as React from 'react';
import {useGetZaakQuery} from '@nl-portal/nl-portal-api';
import {FC, Fragment, ReactElement, useContext} from 'react';
import {Heading2, Heading3, Paragraph} from '@gemeente-denhaag/components-react';
import {DescriptionList} from '@gemeente-denhaag/descriptionlist';
import {Table} from '@gemeente-denhaag/table';
import {Link} from '@gemeente-denhaag/link';
import {FormattedMessage, useIntl} from 'react-intl';
import Skeleton from 'react-loading-skeleton';
import {
  ArchiveIcon,
  ArrowRightIcon,
  CalendarIcon,
  DocumentIcon,
  MegaphoneIcon,
} from '@gemeente-denhaag/icons';
import {Link as RouterLink} from 'react-router-dom';
import {LocaleContext} from '@nl-portal/nl-portal-localization';
import classNames from 'classnames';
import {useMediaQuery, useQuery} from '../../hooks';
import styles from './case-page.module.scss';
import {DocumentList} from '../../components/document-list';
import {MetaIcon} from '../../components/meta-icon';
import {StatusHistory} from '../../components/status-history';
import {BREAKPOINTS} from '../../constants';
import {stringToId} from '../../utils';
import {LocaleDate} from '../../components/locale-date';
import mock from './mock';

interface CasePageProps {
  statusHistoryFacet?: ReactElement;
  statusHistoryBackground?: ReactElement;
  showDocumentsListLink?: boolean;
}

const CasePage: FC<CasePageProps> = ({
  statusHistoryFacet,
  statusHistoryBackground,
  showDocumentsListLink = false,
}) => {
  const intl = useIntl();
  const query = useQuery();
  const {hrefLang} = useContext(LocaleContext);
  const id = query.get('id');
  const {data, loading, error} = useGetZaakQuery({
    variables: {id},
  });
  const isMobile = useMediaQuery(BREAKPOINTS.MOBILE);
  const isDesktop = useMediaQuery(BREAKPOINTS.DESKTOP);
  const isTablet = useMediaQuery(BREAKPOINTS.TABLET);
  const getDocumentsUrl = (caseId: string) => `/zaken/zaak/documenten?id=${caseId}`;

  const getCurrentStatus = (): string => {
    const description = data?.getZaak.status?.statustype.omschrijving;
    const identification = data?.getZaak.zaaktype.identificatie;

    if (description && identification) {
      return intl
        .formatMessage({
          id: `case.${identification}.status.${stringToId(description)}`,
        })
        .toLowerCase();
    }

    return intl.formatMessage({id: 'case.statusUnknown'});
  };

  console.log(mock);

  return (
    <section className={styles.case}>
      {!error ? (
        <Fragment>
          <header className={styles.case__header}>
            <Heading2>
              {loading ? (
                <div
                  aria-busy
                  aria-disabled
                  aria-label={intl.formatMessage({id: 'element.loading'})}
                >
                  <Skeleton width={250} />
                </div>
              ) : (
                <FormattedMessage id={`case.${data?.getZaak.zaaktype.identificatie}.title`} />
              )}
            </Heading2>
          </header>
          <div className={styles['case__meta-icons']}>
            <MetaIcon
              title={intl.formatMessage({id: 'case.caseNumber'})}
              subtitle={(!loading && data?.getZaak.identificatie) || ''}
              icon={<ArchiveIcon />}
              showRightBorder={isMobile || isDesktop}
            />
            <MetaIcon
              title={intl.formatMessage({id: 'case.creationDate'})}
              subtitle={
                !loading && data?.getZaak.startdatum ? (
                  <LocaleDate date={new Date(data?.getZaak.startdatum)} />
                ) : (
                  ''
                )
              }
              icon={<CalendarIcon />}
              showRightBorder={isDesktop}
            />
            <MetaIcon
              title={intl.formatMessage({id: 'case.status'})}
              subtitle={!loading ? getCurrentStatus() : ''}
              icon={<MegaphoneIcon />}
              showRightBorder={isMobile || isDesktop}
            />
            <MetaIcon
              title={intl.formatMessage({id: 'case.documents'})}
              subtitle={(!loading && `${data?.getZaak.documenten.length || 0}`) || ''}
              icon={<DocumentIcon />}
            />
          </div>
          <div className={styles.case__status}>
            <Heading3 className={styles['case__sub-header']}>
              <FormattedMessage id="case.statusHeader" />
            </Heading3>
            <StatusHistory
              caseId={data?.getZaak.zaaktype.identificatie}
              statusHistory={data?.getZaak.statusGeschiedenis}
              statuses={data?.getZaak.statussen}
              status={data?.getZaak.status}
              loading={loading}
              facet={statusHistoryFacet}
              background={statusHistoryBackground}
            />
          </div>
          {mock.data.map(section => {
            if (section.type === 'table' || !Array.isArray(section.value))
              return (
                <div className={styles.case__status} key={section.heading}>
                  <Heading3 className={styles['case__sub-header']}>{section.heading}</Heading3>
                </div>
              );

            return (
              <div className={styles.case__status} key={section.heading}>
                <Heading3 className={styles['case__sub-header']}>{section.heading}</Heading3>
                <DescriptionList
                  items={section.value.map(item => ({
                    title: item.key,
                    detail: item.value,
                  }))}
                />
              </div>
            );
          })}
          <div className={styles.case__documents}>
            <div
              className={classNames(styles['case__documents-header'], {
                [styles['case__documents-header--tablet']]: isTablet,
              })}
            >
              <Heading3 className={classNames({[styles['case__sub-header']]: !isTablet})}>
                <FormattedMessage id="pageTitles.documents" />
              </Heading3>
              {showDocumentsListLink &&
                !loading &&
                data?.getZaak?.documenten &&
                data?.getZaak?.documenten.length > 0 && (
                  <div
                    className={classNames(styles['case__documents-link'], {
                      [styles['case__documents-link--tablet']]: isTablet,
                    })}
                  >
                    <Link
                      component={RouterLink}
                      to={getDocumentsUrl(id || '')}
                      icon={<ArrowRightIcon />}
                      iconAlign="end"
                      hrefLang={hrefLang}
                    >
                      <FormattedMessage id="case.showAllDocuments" />
                    </Link>
                  </div>
                )}
            </div>
            <DocumentList documents={loading ? undefined : data?.getZaak.documenten} />
          </div>
        </Fragment>
      ) : (
        <Paragraph>
          <FormattedMessage id="case.fetchError" />
        </Paragraph>
      )}
    </section>
  );
};

export {CasePage};
