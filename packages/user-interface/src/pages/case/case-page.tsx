import * as React from 'react';
import {
  useGetZaakQuery,
  useGetKlantContactMomentenQuery,
  useGetTakenQuery,
} from '@nl-portal/nl-portal-api';
import {FC, Fragment, ReactElement, useContext} from 'react';
import {Heading2, Heading3, Heading4, Paragraph} from '@gemeente-denhaag/components-react';
import {Action} from '@gemeente-denhaag/action';
import {DescriptionList} from '@gemeente-denhaag/descriptionlist';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@gemeente-denhaag/table';
import {Link} from '@gemeente-denhaag/link';
import {FormattedMessage, useIntl} from 'react-intl';
import Skeleton from 'react-loading-skeleton';
import {ArrowRightIcon} from '@gemeente-denhaag/icons';
import {Link as RouterLink} from 'react-router-dom';
import {LocaleContext} from '@nl-portal/nl-portal-localization';
import ContactTimelineMobile from '@gemeente-denhaag/contact-timeline';
import {useQuery} from '../../hooks';
import styles from './case-page.module.scss';
import '@utrecht/component-library-css';
import {DocumentList} from '../../components/document-list';
import {StatusHistory} from '../../components/status-history';
import {getTaskUrl} from '../../utils';

const Task = ({task}: {task: any}) => {
  if (!task) return null;

  return (
    <div className={styles.case__article}>
      <Action
        actions={
          <RouterLink
            to={getTaskUrl(task.formulier.type, task.formulier.value, task.id)}
            className="utrecht-button-link utrecht-button-link--html-a"
          >
            Ga naar taak
          </RouterLink>
        }
        dateTime={task?.verloopdatum}
        relativeDate
      >
        {task?.title}
      </Action>
    </div>
  );
};

interface CasePageProps {
  statusHistoryFacet?: ReactElement;
  statusHistoryBackground?: ReactElement;
  showDocumentsListLink?: boolean;
  showContactTimeline?: boolean;
}

const CasePage: FC<CasePageProps> = ({
  statusHistoryFacet,
  statusHistoryBackground,
  showDocumentsListLink = false,
  showContactTimeline = false,
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
  const {data: contacten} = useGetKlantContactMomentenQuery();
  const {data: taken} = useGetTakenQuery({variables: {zaakId: id}});

  const getDocumentsUrl = (caseId: string) => `/zaken/zaak/documenten?id=${caseId}`;
  const firstTask = taken?.getTaken?.content[0];

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

  const contactItems = React.useMemo(
    () =>
      contacten?.getKlantContactMomenten?.content.map((contact: any, index: number) => ({
        id: index,
        title: contact.tekst,
        channel: contact.kanaal,
        date: '',
        isoDate: contact.registratiedatum,
        todayLabel: intl.formatMessage({id: 'case.contacttimeline.today'}),
      })),
    [contacten]
  );

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
          <Task task={firstTask} />
          <div className={styles.case__article}>
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
            <div className={styles.case__article}>
              <Heading3 className={styles['case__sub-header']}>
                <FormattedMessage id="case.detailsHeader" />
              </Heading3>
              <DescriptionList items={details} />
            </div>
          )}
          {zaak?.getZaak.zaakdetails.data.map((section: any) => {
            const listItems = section.waarde.filter((i: any) => i.type !== 'table');
            const tables = section.waarde.filter((i: any) => i.type === 'table');

            return (
              <React.Fragment>
                {listItems.length > 0 && (
                  <div className={styles.case__article} key={section.heading}>
                    <Heading3 className={styles['case__sub-header']}>{section.heading}</Heading3>
                    <DescriptionList
                      items={listItems.map((item: any) => ({
                        title: item.omschrijving,
                        detail: item.waarde,
                      }))}
                    />
                  </div>
                )}
                {tables.length > 0 &&
                  tables.map((table: any) => (
                    <div className={styles.case__article} key={section.heading}>
                      <Heading4 className={styles['case__sub-header']}>{table.heading}</Heading4>
                      <Table>
                        {table.waarde.headers.length > 0 && (
                          <TableHead>
                            <TableRow>
                              {table.waarde.headers?.map((header: any) => (
                                <TableHeader>{header.waarde}</TableHeader>
                              ))}
                            </TableRow>
                          </TableHead>
                        )}
                        {table.waarde.rows.length > 0 && (
                          <TableBody>
                            {table.waarde.rows.map((row: any) => (
                              <TableRow>
                                {row.map((cell: {waarde: string}) => (
                                  <TableCell>{cell.waarde}</TableCell>
                                ))}
                              </TableRow>
                            ))}
                          </TableBody>
                        )}
                      </Table>
                    </div>
                  ))}
              </React.Fragment>
            );
          })}
          <div className={styles.case__article}>
            <Heading3 className={styles['case__sub-header']}>
              <FormattedMessage id="pageTitles.documents" />
            </Heading3>
            {showDocumentsListLink &&
              !loading &&
              zaak?.getZaak?.documenten &&
              zaak?.getZaak?.documenten.length > 0 && (
                <Link
                  component={RouterLink}
                  to={getDocumentsUrl(id || '')}
                  icon={<ArrowRightIcon />}
                  iconAlign="end"
                  hrefLang={hrefLang}
                >
                  <FormattedMessage id="case.showAllDocuments" />
                </Link>
              )}
            <DocumentList documents={loading ? undefined : zaak?.getZaak.documenten} />
          </div>
          {showContactTimeline && (
            <div className={styles.case__article}>
              <Heading3 className={styles['case__sub-header']}>
                <FormattedMessage id="case.contactHeader" />
              </Heading3>
              {contactItems && (
                <ContactTimelineMobile
                  items={contactItems}
                  todayLabel={intl.formatMessage({id: 'case.contacttimeline.today'})}
                />
              )}
            </div>
          )}
          <Task task={firstTask} />
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
