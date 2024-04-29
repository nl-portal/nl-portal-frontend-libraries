import { Taak } from "@nl-portal/nl-portal-api";
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
  task: Taak;
  openInContext?: boolean;
}

const Task = ({ task, openInContext }: Props) => {
  const labels = useActionLabels();
  const { currentLocale } = useContext(LocaleContext);
  const { formuliertype, value } = task.formulier ?? {};
  const taskUrl = useTaskUrl(formuliertype, value, task, openInContext);
  const { startPayment, renderPaymentRedirectForm } = useOgonePayment();

  const paymentForm = renderPaymentRedirectForm();
  if (paymentForm) {
    return paymentForm;
  }

  const getActions = () => {
    if (task.data?.type === "betaaltaak") {
      let currentUrl = window.location.href;
      const separator = currentUrl.indexOf("?") !== -1 ? "&" : "?";
      currentUrl += `${separator}type=ogone`;

      const paymentRequestPayload = {
        amount: task.data.amount,
        orderId: task.id,
        reference: task.data.reference,
        pspId: task.data.pspId,
        title: task.title,
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
    if (task.formulier.formuliertype === "externalurl") {
      return (
        <ButtonLink href={taskUrl} target="_blank">
          <ChevronRightIcon />
        </ButtonLink>
      );
    }
  };

  if (!openInContext) {
    return (
      <ActionMulti
        labels={labels}
        dateTime={task.verloopdatum}
        actions={getActions()}
      >
        {task.title}
      </ActionMulti>
    );
  }

  return (
    <ActionSingle
      labels={labels}
      dateTime={task.verloopdatum}
      link={taskUrl}
      Link={PortalLink}
    >
      {task.title}
    </ActionSingle>
  );
};

export default Task;
