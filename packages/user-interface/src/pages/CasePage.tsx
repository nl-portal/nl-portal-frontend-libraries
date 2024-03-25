import * as React from "react";
import {
  useGetZaakQuery,
  useGetTakenQuery,
  useGetObjectContactMomentenLazyQuery,
} from "@nl-portal/nl-portal-api";
import { Fragment } from "react";
import {
  Heading2,
  Heading3,
  Heading4,
  Paragraph,
} from "@gemeente-denhaag/components-react";
import { Action } from "@gemeente-denhaag/action";
import { DescriptionList } from "@gemeente-denhaag/descriptionlist";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@gemeente-denhaag/table";
import { FormattedMessage, useIntl } from "react-intl";
import Skeleton from "react-loading-skeleton";
import { Link as RouterLink, useParams } from "react-router-dom";
import ContactTimeline from "@gemeente-denhaag/contact-timeline";
import styles from "./CasePage.module.scss";
import "@utrecht/component-library-css";
import DocumentList from "../components/DocumentList";
import StatusHistory from "../components/StatusHistory";
import useTaskUrl from "../hooks/useTaskUrl";
import uniqueId from "lodash.uniqueid";
import BackLink, { BackLinkProps } from "../components/BackLink";
import useActionLabels from "../hooks/useActionLabels";
import { Taak } from "@nl-portal/nl-portal-api";
import { ContactMoment } from "@nl-portal/nl-portal-api";

const Task = ({ task }: { task: Taak }) => {
  const labels = useActionLabels();
  const { formuliertype, value } = task?.formulier ?? {};
  const taskUrl = useTaskUrl(formuliertype, value, task?.id);

  if (!task) return null;

  return (
    <div className={styles.case__article}>
      <Action
        actions={
          <RouterLink
            to={taskUrl}
            className="utrecht-button-link utrecht-button-link--html-a"
          >
            Ga naar taak
          </RouterLink>
        }
        dateTime={task?.verloopdatum}
        relativeDate
        labels={labels}
      >
        {task?.title}
      </Action>
    </div>
  );
};

interface CasePageProps {
  showContactTimeline?: boolean;
  backlink?: BackLinkProps;
}

const CasePage = ({
  showContactTimeline = false,
  backlink = {},
}: CasePageProps) => {
  const intl = useIntl();
  const { id } = useParams();
  const {
    data: zaak,
    loading,
    error,
  } = useGetZaakQuery({
    variables: { id },
  });
  const [getMomenten, { data: contacten }] =
    useGetObjectContactMomentenLazyQuery();
  const { data: tasksDataResult } = useGetTakenQuery({
    variables: { zaakId: id },
  });
  const tasksData = tasksDataResult?.getTaken.content as Taak[] | undefined;

  const firstTask = tasksData?.[0];
  const details = React.useMemo(() => {
    if (!zaak?.getZaak) return [];

    const array = [
      {
        title: intl.formatMessage({ id: "case.creationDate" }),
        detail: new Date(zaak?.getZaak.startdatum).toLocaleDateString(),
      },
      {
        title: intl.formatMessage({ id: "case.caseNumber" }),
        detail: zaak?.getZaak.identificatie || "",
      },
    ];

    if (zaak?.getZaak.omschrijving)
      array.push({
        title: intl.formatMessage({ id: "case.description" }),
        detail: zaak?.getZaak.omschrijving || "",
      });

    return array;
  }, [zaak]); // eslint-disable-line react-hooks/exhaustive-deps

  const contactItems = React.useMemo(() => {
    if (!contacten?.getObjectContactMomenten) return [];
    const contactenContent = contacten?.getObjectContactMomenten
      ?.content as ContactMoment[];
    return contactenContent.map((contact: ContactMoment, index: number) => ({
      id: index,
      title: contact.tekst,
      channel: contact.kanaal,
      isoDate: contact.registratiedatum,
    }));
  }, [contacten]);

  const contactLabels = {
    yesterday: intl.formatMessage({ id: "case.contacttimeline.yesterday" }),
    today: intl.formatMessage({ id: "case.contacttimeline.today" }),
  };

  React.useEffect(() => {
    if (!zaak) return;
    getMomenten({ variables: { objectUrl: zaak.getZaak.url } });
  }, [zaak]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.case}>
      {!error ? (
        <Fragment>
          {backlink && <BackLink {...backlink} />}
          <header className={styles.case__header}>
            <Heading2>
              {loading ? (
                <div
                  aria-busy
                  aria-disabled
                  aria-label={intl.formatMessage({ id: "element.loading" })}
                >
                  <Skeleton width={250} />
                </div>
              ) : (
                <FormattedMessage
                  id={`case.${zaak?.getZaak.zaaktype.identificatie}.title`}
                />
              )}
            </Heading2>
          </header>
          {firstTask && <Task task={firstTask} />}
          <div className={styles.case__article}>
            <Heading3 className={styles["case__sub-header"]}>
              <FormattedMessage id="case.statusHeader" />
            </Heading3>
            <StatusHistory
              caseId={zaak?.getZaak.zaaktype.identificatie}
              statusHistory={zaak?.getZaak.statusGeschiedenis}
              statuses={zaak?.getZaak.statussen}
              status={zaak?.getZaak.status}
              loading={loading}
            />
          </div>
          {details.length > 0 && (
            <div className={styles.case__article}>
              <Heading3 className={styles["case__sub-header"]}>
                <FormattedMessage id="case.detailsHeader" />
              </Heading3>
              <DescriptionList items={details} />
            </div>
          )}
          {/* eslint-disable @typescript-eslint/no-explicit-any */}
          {zaak?.getZaak.zaakdetails.data.map((section: any) => {
            const listItems = section.waarde.filter(
              (i: any) => i.type !== "table",
            );
            const tables = section.waarde.filter(
              (i: any) => i.type === "table",
            );

            return (
              <React.Fragment key={section.heading}>
                {listItems.length > 0 && (
                  <div className={styles.case__article}>
                    <Heading3 className={styles["case__sub-header"]}>
                      {section.heading}
                    </Heading3>
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
                      <Heading4 className={styles["case__sub-header"]}>
                        {table.heading}
                      </Heading4>
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
                              <TableRow key={`${uniqueId("TableRow")}`}>
                                {row.map((cell: { waarde: string }) => (
                                  <TableCell key={`${uniqueId(cell.waarde)}`}>
                                    {cell.waarde}
                                  </TableCell>
                                ))}
                              </TableRow>
                            ))}
                            {/* eslint-enable @typescript-eslint/no-explicit-any */}
                          </TableBody>
                        )}
                      </Table>
                    </div>
                  ))}
              </React.Fragment>
            );
          })}
          <div className={styles.case__article}>
            <Heading3 className={styles["case__sub-header"]}>
              <FormattedMessage id="pageTitles.documents" />
            </Heading3>
            <DocumentList
              documents={loading ? undefined : zaak?.getZaak.documenten}
            />
          </div>
          {showContactTimeline && contactItems.length > 0 && (
            <div className={styles.case__article}>
              <Heading3 className={styles["case__sub-header"]}>
                <FormattedMessage id="case.contactHeader" />
              </Heading3>
              <ContactTimeline items={contactItems} labels={contactLabels} />
            </div>
          )}
          {firstTask && <Task task={firstTask} />}
        </Fragment>
      ) : (
        <Paragraph>
          <FormattedMessage id="case.fetchError" />
        </Paragraph>
      )}
    </div>
  );
};

export default CasePage;
