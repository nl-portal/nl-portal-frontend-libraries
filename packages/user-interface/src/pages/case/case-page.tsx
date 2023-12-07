import * as React from 'react';
import {
  useGetZaakQuery,
  useGetTakenQuery,
  useGetObjectContactMomentenLazyQuery,
} from '@nl-portal/nl-portal-api';
import {FC, Fragment, ReactElement} from 'react';
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
import {FormattedMessage, useIntl} from 'react-intl';
import Skeleton from 'react-loading-skeleton';
import {Link as RouterLink} from 'react-router-dom';
import ContactTimelineMobile from '@gemeente-denhaag/contact-timeline';
import {useQuery} from '../../hooks';
import styles from './case-page.module.scss';
import '@utrecht/component-library-css';
import {DocumentList} from '../../components/document-list';
import {StatusHistory} from '../../components/status-history';
import {getTaskUrl} from '../../utils';
import {uniqueId} from 'lodash';

const Task = ({task}: {task: any}) => {
  if (!task) return null;

  return (
    <div className={styles.case__article}>
      <Action
        actions={
          <RouterLink
            to={getTaskUrl(task.formulier.formuliertype, task.formulier.value, task.id)}
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
  showContactTimeline?: boolean;
}

const CasePage: FC<CasePageProps> = ({
  statusHistoryFacet,
  statusHistoryBackground,
  showContactTimeline = false,
}) => {
  const intl = useIntl();
  const query = useQuery();
  const id = query.get('id');
  const {
    data: zaak,
    loading,
    error,
  } = useGetZaakQuery({
    variables: {id},
  });
  const [getMomenten, {data: contacten}] = useGetObjectContactMomentenLazyQuery();
  const {data: taken} = useGetTakenQuery({variables: {zaakId: id}});

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

  const contactItems = React.useMemo(() => {
    if (!contacten?.getObjectContactMomenten) return [];

    return contacten?.getObjectContactMomenten?.content.map((contact: any, index: number) => ({
      id: index,
      title: contact.tekst,
      channel: contact.kanaal,
      date: '',
      isoDate: contact.registratiedatum,
      todayLabel: intl.formatMessage({id: 'case.contacttimeline.today'}),
    }));
  }, [contacten]);

  React.useEffect(() => {
    if (!zaak) return;
    getMomenten({variables: {objectUrl: zaak.getZaak.url}});
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
              <React.Fragment key={section.heading}>
                {listItems.length > 0 && (
                  <div className={styles.case__article}>
                    <Heading3 className={styles['case__sub-header']}>{section.heading}</Heading3>
                    <DescriptionList
                      items={listItems.map((item: any) => ({
                        title: item.key,
                        detail: item.waarde,
                      }))}
                    />
                  </div>
                )}
                {tables.length > 0 &&
                  tables.map((table: any) => (
                    <div key={table.heading} className={styles.case__article}>
                      <Heading4 className={styles['case__sub-header']}>{table.heading}</Heading4>
                      <Table>
                        {table.waarde.headers.length > 0 && (
                          <TableHead>
                            <TableRow>
                              {table.waarde.headers?.map((header: any) => (
                                <TableHeader key={`${uniqueId(header.waarde)}`}>
                                  {header.waarde}
                                </TableHeader>
                              ))}
                            </TableRow>
                          </TableHead>
                        )}
                        {table.waarde.rows.length > 0 && (
                          <TableBody>
                            {table.waarde.rows.map((row: any) => (
                              <TableRow key={`${uniqueId('TableRow')}`}>
                                {row.map((cell: {waarde: string}) => (
                                  <TableCell key={`${uniqueId(cell.waarde)}`}>
                                    {cell.waarde}
                                  </TableCell>
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
            <DocumentList documents={loading ? undefined : zaak?.getZaak.documenten} />
          </div>
          {showContactTimeline && contactItems.length > 0 && (
            <div className={styles.case__article}>
              <Heading3 className={styles['case__sub-header']}>
                <FormattedMessage id="case.contactHeader" />
              </Heading3>
              <ContactTimelineMobile
                items={contactItems}
                todayLabel={intl.formatMessage({id: 'case.contacttimeline.today'})}
              />
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
