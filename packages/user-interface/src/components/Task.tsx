import { Taak } from "@nl-portal/nl-portal-api";
import PortalLink from "./PortalLink";
import { ActionMulti, ActionSingle } from "@gemeente-denhaag/action";
import useTaskUrl from "../hooks/useTaskUrl";
import useActionLabels from "../hooks/useActionLabels";
import { ButtonLink } from "@gemeente-denhaag/button-link";
import { ChevronRightIcon } from "@gemeente-denhaag/icons";
import useOgonePayment from "../hooks/useOgonePayment";

interface Props {
  task: Taak;
}

const Task = ({ task }: Props) => {
  const labels = useActionLabels();
  const { formuliertype, value } = task.formulier ?? {};
  const taskUrl = useTaskUrl(formuliertype, value, task.id);
  const { startPayment, renderPaymentRedirectForm, showPaymentRedirectForm } =
    useOgonePayment();

  if (showPaymentRedirectForm) {
    return renderPaymentRedirectForm();
  }

  const testingPayment = true;

  if (testingPayment) {
    const paymentRequestPayload = {
      amount: 100.25,
      orderId: "17021072517",
      reference: "12345",
      pspId: "TAX",
      title: "Belastingzaken",
      langId: "nl_NL",
      successUrl: "https://mijn-a.acc.denhaag.nl?return=success",
      failureUrl: "https://mijn-a.acc.denhaag.nl?return=failure",
    };

    return (
      <>
        <ActionMulti
          labels={labels}
          dateTime={task.verloopdatum}
          actions={
            <ButtonLink href={taskUrl} target="_blank">
              <ChevronRightIcon />
            </ButtonLink>
          }
          onClick={() => startPayment(paymentRequestPayload)}
        >
          {task.title}
        </ActionMulti>
      </>
    );
  }

  if (task.formulier.formuliertype === "externalurl")
    return (
      <ActionMulti
        labels={labels}
        dateTime={task.verloopdatum}
        actions={
          <ButtonLink href={taskUrl} target="_blank">
            <ChevronRightIcon />
          </ButtonLink>
        }
      >
        {task.title}
      </ActionMulti>
    );

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
