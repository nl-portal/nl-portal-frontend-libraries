import React, { useContext, useEffect } from "react";
import {
  useGetZaakQuery,
  useGetTakenV2Query,
  TaakV2,
  ZaakStatus,
  OnderwerpObjectIndentificatorType,
  useGetUserKlantContactenLazyQuery,
} from "@nl-portal/nl-portal-api";
import {
  LocaleContext,
  useDateFormatter,
} from "@nl-portal/nl-portal-localization";
import { Paragraph } from "@gemeente-denhaag/typography";
import { FormattedMessage, useIntl } from "react-intl";
import { useParams } from "react-router";
import "@utrecht/component-library-css";
import { ContactTimeline } from "@gemeente-denhaag/contact-timeline";
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
import { ExtraCaseDetails, Details } from "../components/ExtraCaseDetails";
import NotificationContext from "../contexts/NotificationContext";
import { stringToSlug } from "../utils/string-to-slug";
import { caseResults } from "../constants/case-results";
import Pre from "../components/Pre";

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
    useGetUserKlantContactenLazyQuery();

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

  const { dispatch } = useContext(NotificationContext);

  useEffect(() => {
    if (!caseData?.getZaak?.resultaat?.resultaattype?.omschrijvingGeneriek)
      return;

    const slug = stringToSlug(
      caseData?.getZaak.resultaat?.resultaattype.omschrijvingGeneriek,
    );
    const variant = caseResults[slug];

    if (!variant) return;

    dispatch({
      type: "CREATE",
      id: "caseResult",
      notification: {
        variant,
        title: <FormattedMessage id={`caseDetails.resultAlert.${slug}`} />,
        text: "",
        closable: false,
      },
    });
  }, [caseData]);

  useEffect(() => {
    if (paymentStatus === PaymentStatus.SUCCESS) {
      dispatch({
        type: "CREATE",
        id: "casePaymentSuccess",
        notification: {
          variant: "success",
          title: <FormattedMessage id="task.paymentSuccessTitle" />,
          text: <FormattedMessage id="task.paymentSuccessText" />,
        },
      });
    }
    if (paymentStatus === PaymentStatus.FAILURE) {
      dispatch({
        type: "CREATE",
        id: "casePaymentFailure",
        notification: {
          variant: "error",
          title: <FormattedMessage id="task.paymentFailureTitle" />,
          text: <FormattedMessage id="task.paymentFailureText" />,
        },
      });
    }
  }, [paymentStatus]);

  const details = React.useMemo(() => {
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

    if (caseData?.getZaak.resultaat?.resultaattype.omschrijvingGeneriek) {
      array.push({
        title: intl.formatMessage({ id: "caseDetails.resultaat" }),
        detail:
          caseData?.getZaak.resultaat?.resultaattype.omschrijvingGeneriek || "",
      });
    }

    if (
      window.SHOW_CASE_RESULT_EXPLANATION === "true" &&
      caseData?.getZaak.resultaat?.toelichting
    ) {
      array.push({
        title: intl.formatMessage({ id: "caseDetails.resultaatToelichting" }),
        detail: <Pre>{caseData?.getZaak.resultaat.toelichting}</Pre>,
      });
    }

    return array;
  }, [caseData, currentLocale]);

  const contactItems = React.useMemo(() => {
    if (!momentsData) return [];

    return momentsData.getUserKlantContacten.map((contact, index) => ({
      id: index,
      title: contact.onderwerp,
      description: contact.inhoud && <Pre>{contact.inhoud}</Pre>,
      channel: contact.kanaal,
      isoDate: contact.plaatsgevondenOp,
    }));
  }, [momentsData]);

  const contactLabels = {
    yesterday: intl.formatMessage({
      id: "caseDetails.contacttimeline.yesterday",
    }),
    today: intl.formatMessage({ id: "caseDetails.contacttimeline.today" }),
  };

  React.useEffect(() => {
    if (!caseData) return;
    getMomenten({
      variables: {
        identificatorType: OnderwerpObjectIndentificatorType.Zaak,
        identificatorId: caseData.getZaak.uuid,
      },
    });
  }, [caseData]);

  if (!caseError) {
    <div>
      <Paragraph>
        <FormattedMessage id="caseDetails.fetchError" />
      </Paragraph>
    </div>;
  }

  const zaakDetails = caseData?.getZaak.zaakdetails.data as
    | Details[]
    | undefined;

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
            collapsible={contactItems.some((item) => Boolean(item.description))}
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
