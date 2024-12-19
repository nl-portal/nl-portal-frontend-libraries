import React, { useContext, useEffect } from "react";
import {
  useGetZaakQuery,
  useGetTakenV2Query,
  useGetObjectContactMomentenLazyQuery,
  TaakV2,
  ContactMoment,
  ZaakStatus,
} from "@nl-portal/nl-portal-api";
import {
  LocaleContext,
  useDateFormatter,
} from "@nl-portal/nl-portal-localization";
import { Paragraph } from "@gemeente-denhaag/typography";
import { FormattedMessage, useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import ContactTimeline from "@gemeente-denhaag/contact-timeline";
import "@utrecht/component-library-css";
import DocumentsList from "../components/DocumentsList";
import StatusHistory from "../components/StatusHistory";
import BackLink from "../components/BackLink";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import TasksList from "../components/TasksList";
import SectionHeader from "../components/SectionHeader";
import useOgonePaymentRegistration, {
  PaymentStatus,
} from "../hooks/useOgonePaymentRegistration";
import DescriptionList from "../components/DescriptionList";
import ExtraCaseDetails, { Details } from "../components/ExtraCaseDetails";
import NotificationContext from "../contexts/NotificationContext";

interface CasePageProps {
  showContactTimeline?: boolean;
}

const CaseDetailsPage = ({ showContactTimeline = false }: CasePageProps) => {
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
  const { formatDate } = useDateFormatter();
  const { paymentStatus, orderId } = useOgonePaymentRegistration(true);
  const loading = caseLoading || taskLoading || momentsLoading;

  // Remove task with the orderId to prevent race condition with the payment handling in the backend
  const tasks = (
    paymentStatus === PaymentStatus.SUCCESS && orderId
      ? tasksResult?.getTakenV2.content.filter((item) => item.id !== orderId)
      : tasksResult?.getTakenV2.content
  ) as TaakV2[] | undefined;

  const { pushNotification } = useContext(NotificationContext);

  useEffect(() => {
    if (paymentStatus === PaymentStatus.SUCCESS) {
      pushNotification("casePaymentSuccess", {
        variant: "success",
        title: <FormattedMessage id="task.paymentSuccessTitle" />,
        text: <FormattedMessage id="task.paymentSuccessText" />,
      });
    }
    if (paymentStatus === PaymentStatus.FAILURE) {
      pushNotification("casePaymentFailure", {
        variant: "error",
        title: <FormattedMessage id="task.paymentFailureTitle" />,
        text: <FormattedMessage id="task.paymentFailureText" />,
      });
    }
  }, [paymentStatus]);

  const details = React.useMemo(() => {
    console.log(caseData);
    if (!caseData?.getZaak) return [];

    const array = [
      {
        title: intl.formatMessage({ id: "caseDetails.creationDate" }),
        detail: formatDate({ date: caseData?.getZaak.startdatum }),
      },
      {
        title: intl.formatMessage({ id: "caseDetails.caseNumber" }),
        detail: (
          <span translate="no">{caseData?.getZaak.identificatie || ""}</span>
        ),
      },
    ];

    if (caseData?.getZaak.omschrijving)
      array.push({
        title: intl.formatMessage({ id: "caseDetails.description" }),
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
    yesterday: intl.formatMessage({
      id: "caseDetails.contacttimeline.yesterday",
    }),
    today: intl.formatMessage({ id: "caseDetails.contacttimeline.today" }),
  };

  React.useEffect(() => {
    if (!caseData) return;
    getMomenten({ variables: { objectUrl: caseData.getZaak.url } });
  }, [caseData]);

  if (!caseError) {
    <div>
      <Paragraph>
        <FormattedMessage id="caseDetails.fetchError" />
      </Paragraph>
    </div>;
  }

  // Function to do a runtime check on the extra zaakdetails to prevent possible errors
  const isZaakDetailsArray = (data: unknown): data is Details[] => {
    return (
      Array.isArray(data) &&
      data.every(
        (item) =>
          typeof item === "object" &&
          item !== null &&
          "type" in item &&
          typeof (item as Details).type === "string" &&
          "heading" in item &&
          typeof (item as Details).heading === "string" &&
          "items" in item &&
          typeof (item as Details).items === "object",
      )
    );
  };

  const zaakDetailsData = caseData?.getZaak.zaakdetails.data;
  const zaakDetails = isZaakDetailsArray(zaakDetailsData)
    ? zaakDetailsData
    : undefined;

  return (
    <PageGrid>
      <div>
        <BackLink />
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
          title={intl.formatMessage({ id: "caseDetails.statusHeader" })}
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
          titleTranslationId="caseDetails.detailsHeader"
          items={details}
        />
      )}
      {zaakDetails && <ExtraCaseDetails data={zaakDetails} />}
      <DocumentsList
        loading={loading}
        error={Boolean(caseError)}
        documents={caseData?.getZaak.documenten}
      />
      {showContactTimeline && contactItems.length > 0 && (
        <section>
          <SectionHeader
            title={intl.formatMessage({ id: "caseDetails.contactHeader" })}
          />
          <ContactTimeline
            items={contactItems}
            labels={contactLabels}
            locale={currentLocale}
          />
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

export default CaseDetailsPage;
