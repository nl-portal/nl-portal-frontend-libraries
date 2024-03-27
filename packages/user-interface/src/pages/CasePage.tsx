import * as React from "react";
import {
  useGetZaakQuery,
  useGetTakenQuery,
  useGetObjectContactMomentenLazyQuery,
  Taak,
} from "@nl-portal/nl-portal-api";
import { Paragraph } from "@gemeente-denhaag/components-react";
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
import { useParams } from "react-router-dom";
import ContactTimeline from "@gemeente-denhaag/contact-timeline";
import "@utrecht/component-library-css";
import DocumentsList from "../components/DocumentsList";
import StatusHistory from "../components/StatusHistory";
import uniqueId from "lodash.uniqueid";
import BackLink, { BackLinkProps } from "../components/BackLink";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import TasksList from "../components/TasksList";
import SectionHeader from "../components/SectionHeader";

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
    data: caseData,
    loading: caseLoading,
    error: caseError,
  } = useGetZaakQuery({
    variables: { id },
  });
  const [getMomenten, { data: momentsData, loading: momentsLoading }] =
    useGetObjectContactMomentenLazyQuery();
  const { data: taskData, loading: taskLoading } = useGetTakenQuery({
    variables: { zaakId: id },
  });
  const loading = caseLoading || taskLoading || momentsLoading;

  const details = React.useMemo(() => {
    if (!caseData?.getZaak) return [];

    const array = [
      {
        title: intl.formatMessage({ id: "case.creationDate" }),
        detail: new Date(caseData?.getZaak.startdatum).toLocaleDateString(),
      },
      {
        title: intl.formatMessage({ id: "case.caseNumber" }),
        detail: caseData?.getZaak.identificatie || "",
      },
    ];

    if (caseData?.getZaak.omschrijving)
      array.push({
        title: intl.formatMessage({ id: "case.description" }),
        detail: caseData?.getZaak.omschrijving || "",
      });

    return array;
  }, [caseData]);

  const contactItems = React.useMemo(() => {
    if (!momentsData?.getObjectContactMomenten) return [];

    return momentsData?.getObjectContactMomenten?.content.map(
      (contact: any, index: number) => ({
        id: index,
        title: contact.tekst,
        channel: contact.kanaal,
        isoDate: contact.registratiedatum,
      }),
    );
  }, [momentsData]);

  const contactLabels = {
    yesterday: intl.formatMessage({ id: "case.contacttimeline.yesterday" }),
    today: intl.formatMessage({ id: "case.contacttimeline.today" }),
  };

  React.useEffect(() => {
    if (!caseData) return;
    getMomenten({ variables: { objectUrl: caseData.getZaak.url } });
  }, [caseData]);

  if (!caseError) {
    <div>
      <Paragraph>
        <FormattedMessage id="case.fetchError" />
      </Paragraph>
    </div>;
  }

  return (
    <PageGrid>
      <div>
        {backlink && <BackLink {...backlink} />}
        <PageHeader
          loading={loading}
          title={
            !loading &&
            intl.formatMessage({
              id: `case.${caseData?.getZaak.zaaktype.identificatie}.title`,
            })
          }
        />
      </div>
      <TasksList
        loading={loading}
        showEmpty={false}
        showTitle={false}
        tasks={taskData?.getTaken.content as Taak[]}
      />
      <div>
        <SectionHeader
          title={intl.formatMessage({ id: "case.statusHeader" })}
        />
        <StatusHistory
          loading={loading}
          caseId={caseData?.getZaak.zaaktype.identificatie}
          statusHistory={caseData?.getZaak.statusGeschiedenis}
          statuses={caseData?.getZaak.statussen}
          status={caseData?.getZaak.status}
        />
      </div>
      {details.length > 0 && (
        <div>
          <SectionHeader
            title={intl.formatMessage({ id: "case.detailsHeader" })}
          />
          <DescriptionList items={details} />
        </div>
      )}
      {caseData?.getZaak.zaakdetails.data.map((section: any) => {
        const listItems = section.waarde.filter((i: any) => i.type !== "table");
        const tables = section.waarde.filter((i: any) => i.type === "table");

        return (
          <React.Fragment key={section.heading}>
            {listItems.length > 0 && (
              <div>
                <SectionHeader title={section.heading} />
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
                <div key={table.heading}>
                  <SectionHeader title={table.heading} small />
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
                      </TableBody>
                    )}
                  </Table>
                </div>
              ))}
          </React.Fragment>
        );
      })}
      <DocumentsList
        loading={loading}
        error={Boolean(caseError)}
        documents={caseData?.getZaak.documenten}
      />
      {showContactTimeline && contactItems.length > 0 && (
        <div>
          <SectionHeader
            title={intl.formatMessage({ id: "case.contactHeader" })}
          />
          <ContactTimeline items={contactItems} labels={contactLabels} />
        </div>
      )}
      <TasksList
        loading={loading}
        showEmpty={false}
        showTitle={false}
        tasks={taskData?.getTaken.content as Taak[]}
      />
    </PageGrid>
  );
};

export default CasePage;
