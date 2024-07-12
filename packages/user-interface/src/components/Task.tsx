import { TaakSoort, TaakV2 } from "@nl-portal/nl-portal-api";
import PortalLink from "./PortalLink";
import { ActionMulti, ActionSingle } from "@gemeente-denhaag/action";
import useTaskUrl from "../hooks/useTaskUrl";
import useActionLabels from "../hooks/useActionLabels";
import { ButtonLink } from "@gemeente-denhaag/button-link";
import { ChevronRightIcon } from "@gemeente-denhaag/icons";
import useOgonePayment from "../hooks/useOgonePayment";
import { Button } from "@gemeente-denhaag/components-react";
import { useContext } from "react";
import { LocaleContext } from "@nl-portal/nl-portal-localization";

interface Props {
  task: TaakV2;
  openInContext?: boolean;
}

const Task = ({ task, openInContext }: Props) => {
  const labels = useActionLabels();
  const { currentLocale } = useContext(LocaleContext);
  const { startPayment, renderPaymentRedirectForm } = useOgonePayment();
  const taskUrl = useTaskUrl(task, openInContext);

  if (task.soort === TaakSoort.Ogonebetaling) {
    if (!task.ogonebetaling) {
      return;
    }

    const paymentForm = renderPaymentRedirectForm();
    if (paymentForm) {
      return paymentForm;
    }

    let currentUrl = window.location.href;
    const separator = currentUrl.indexOf("?") !== -1 ? "&" : "?";
    currentUrl += `${separator}type=ogone`;

    const paymentRequestPayload = {
      amount: task.ogonebetaling?.bedrag,
      orderId: task.id,
      reference: "",
      pspId: task.ogonebetaling.pspid,
      title: task.titel,
      langId: currentLocale.replace("-", "_"),
      successUrl: `${currentUrl}&success=true`,
      failureUrl: currentUrl,
    };

    return (
      <Button onClick={() => startPayment(paymentRequestPayload)}>
        Betalen
      </Button>
    );
  }

  if (task.soort === TaakSoort.Url) {
    return (
      <ActionMulti
        relativeDate
        labels={labels}
        dateTime={task.verloopdatum}
        actions={
          <ButtonLink href={taskUrl} target="_blank">
            <ChevronRightIcon />
          </ButtonLink>
        }
      >
        {task.titel}
      </ActionMulti>
    );
  }
  return (
    <ActionSingle
      relativeDate
      labels={labels}
      dateTime={task.verloopdatum}
      link={taskUrl ?? ""}
      Link={PortalLink}
    >
      {task.titel}
    </ActionSingle>
  );
};

export default Task;
