import React, { useContext } from "react";
import {
  useGetZaakQuery,
  useGetTakenV2Query,
  useGetObjectContactMomentenLazyQuery,
  TaakV2,
  ContactMoment,
  ZaakStatus,
} from "@nl-portal/nl-portal-api";
import { Alert } from "@gemeente-denhaag/alert";
import { LocaleContext } from "@nl-portal/nl-portal-localization";
import { Paragraph } from "@gemeente-denhaag/typography";
import { FormattedMessage, useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import ContactTimeline from "@gemeente-denhaag/contact-timeline";
import "@utrecht/component-library-css";
import DocumentsList from "../components/DocumentsList";
import StatusHistory from "../components/StatusHistory";
import BackLink, { BackLinkProps } from "../components/BackLink";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import TasksList from "../components/TasksList";
import SectionHeader from "../components/SectionHeader";
import useOgonePaymentRegistration, {
  PaymentStatus,
} from "../hooks/useOgonePaymentRegistration";
import DescriptionList from "../components/DescriptionList";
import ExtraCaseDetails, { Details } from "../components/ExtraCaseDetails";

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
  const { currentLocale } = useContext(LocaleContext);
  const {
    data: caseData,
    loading: caseLoading,
    error: caseError,
  } = useGetZaakQuery({
    variables: { id },
  });
  const [getMomenten, { data: momentsData, loading: momentsLoading }] =
    useGetObjectContactMomentenLazyQuery();
  const { data: tasksResult, loading: taskLoading } = useGetTakenV2Query({
    variables: { zaakId: id },
  });
  const { paymentStatus } = useOgonePaymentRegistration();

  const loading = caseLoading || taskLoading || momentsLoading;
  const tasks = tasksResult?.getTakenV2.content as TaakV2[] | undefined;

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
  }, [caseData, currentLocale]);

  const contactItems = React.useMemo(() => {
    if (!momentsData?.getObjectContactMomenten) return [];

    return momentsData?.getObjectContactMomenten?.content.map(
      (contact: ContactMoment, index: number) => ({
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

  const zaakDetails = caseData?.getZaak.zaakdetails.data as Details[];

  return (
    <PageGrid>
      {paymentStatus === PaymentStatus.SUCCESS && (
        <Alert
          variant="success"
          title={intl.formatMessage({ id: "task.paymentSuccessTitle" })}
          text={intl.formatMessage({ id: "task.paymentSuccessText" })}
        />
      )}
      {paymentStatus === PaymentStatus.FAILURE && (
        <Alert
          variant="error"
          title={intl.formatMessage({ id: "task.paymentFailureTitle" })}
          text={intl.formatMessage({ id: "task.paymentFailureText" })}
        />
      )}
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
        titleTranslationId={null}
        tasks={tasks}
      />
      <section>
        <SectionHeader
          title={intl.formatMessage({ id: "case.statusHeader" })}
        />
        <StatusHistory
          loading={loading}
          caseId={caseData?.getZaak.zaaktype.identificatie}
          statusHistory={
            caseData?.getZaak.statusGeschiedenis as ZaakStatus[] | undefined
          }
          statuses={caseData?.getZaak.statussen}
          status={caseData?.getZaak.status as ZaakStatus | undefined}
        />
      </section>
      {details.length > 0 && (
        <DescriptionList
          titleTranslationId="case.detailsHeader"
          items={details}
        />
      )}
      <ExtraCaseDetails data={zaakDetails} />
      <DocumentsList
        loading={loading}
        error={Boolean(caseError)}
        documents={caseData?.getZaak.documenten}
      />
      {showContactTimeline && contactItems.length > 0 && (
        <section>
          <SectionHeader
            title={intl.formatMessage({ id: "case.contactHeader" })}
          />
          <ContactTimeline items={contactItems} labels={contactLabels} />
        </section>
      )}
      <TasksList
        loading={loading}
        showEmpty={false}
        titleTranslationId={null}
        tasks={tasks}
      />
    </PageGrid>
  );
};

export default CasePage;
