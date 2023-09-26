import * as React from 'react';
import {useGetZaakQuery} from '@nl-portal/nl-portal-api';
import {FC, Fragment, ReactElement, useContext} from 'react';
import {Heading2, Heading3, Paragraph} from '@gemeente-denhaag/components-react';
import {DescriptionList} from '@gemeente-denhaag/descriptionlist';
import {Link} from '@gemeente-denhaag/link';
import {FormattedMessage, useIntl} from 'react-intl';
import Skeleton from 'react-loading-skeleton';
import {ArrowRightIcon} from '@gemeente-denhaag/icons';
import {Link as RouterLink} from 'react-router-dom';
import {LocaleContext} from '@nl-portal/nl-portal-localization';
import classNames from 'classnames';
import {useMediaQuery, useQuery} from '../../hooks';
import styles from './case-page.module.scss';
import {DocumentList} from '../../components/document-list';
import {StatusHistory} from '../../components/status-history';
import {BREAKPOINTS} from '../../constants';

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
  const {
    data: zaak,
    loading,
    error,
  } = useGetZaakQuery({
    variables: {id},
  });
  const isTablet = useMediaQuery(BREAKPOINTS.TABLET);
  const getDocumentsUrl = (caseId: string) => `/zaken/zaak/documenten?id=${caseId}`;

  const details = React.useMemo(() => {
    if (!zaak?.getZaak) return [];

    const array = [
      {
        title: intl.formatMessage({id: 'case.creationDate'}),
        detail: new Date(zaak?.getZaak.startdatum).toLocaleDateString(),
      },
      {
        title: intl.formatMessage({id: 'case.caseNumber'}),
        detail: zaak?.getZaak.identificatie || '',
      },
    ];

    if (zaak?.getZaak.omschrijving)
      array.push({
        title: intl.formatMessage({id: 'case.description'}),
        detail: zaak?.getZaak.omschrijving || '',
      });

    return array;
  }, [zaak]);

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
                <FormattedMessage id={`case.${zaak?.getZaak.zaaktype.identificatie}.title`} />
              )}
            </Heading2>
          </header>
          <div className={styles.case__status}>
            <Heading3 className={styles['case__sub-header']}>
              <FormattedMessage id="case.statusHeader" />
            </Heading3>
            <StatusHistory
              caseId={zaak?.getZaak.zaaktype.identificatie}
              statusHistory={zaak?.getZaak.statusGeschiedenis}
              statuses={zaak?.getZaak.statussen}
              status={zaak?.getZaak.status}
              loading={loading}
              facet={statusHistoryFacet}
              background={statusHistoryBackground}
            />
          </div>
          {details.length > 0 && (
            <div className={styles.case__status}>
              <Heading3 className={styles['case__sub-header']}>
                <FormattedMessage id="case.detailsHeader" />
              </Heading3>
              <DescriptionList items={details} />
            </div>
          )}
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
                zaak?.getZaak?.documenten &&
                zaak?.getZaak?.documenten.length > 0 && (
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
            <DocumentList documents={loading ? undefined : zaak?.getZaak.documenten} />
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
