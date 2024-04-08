import { Taak } from "@nl-portal/nl-portal-api";
import PortalLink from "./PortalLink";
import { ActionMulti, ActionSingle } from "@gemeente-denhaag/action";
import useTaskUrl from "../hooks/useTaskUrl";
import useActionLabels from "../hooks/useActionLabels";
import { ButtonLink } from "@gemeente-denhaag/button-link";
import { ChevronRightIcon } from "@gemeente-denhaag/icons";
import usePayment from "../hooks/usePayment";

interface Props {
  task: Taak;
}

const Task = ({ task }: Props) => {
  const labels = useActionLabels();
  const { formuliertype, value } = task.formulier ?? {};
  const taskUrl = useTaskUrl(formuliertype, value, task.id);
  const { startPayment, renderPaymentRedirectForm, showPaymentRedirectForm } =
    usePayment();

  if (showPaymentRedirectForm) {
    return renderPaymentRedirectForm();
  }

  const testingPayment = true;

  if (testingPayment) {
    const paymentRequestPayload = {
      amount: 100.25,
      orderId: "123456321-412",
      reference: "12345",
      title: "Gemeente belastingen 2024",
      langId: "nl_NL",
      successUrl: "https://klantportaal-zgw.test.denhaag.nl?return=success",
      failureUrl: "https://klantportaal-zgw.test.denhaag.nl?return=failure",
    };

    const paymentProfileIdentifier = "belastingzaken";

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
          onClick={() =>
            startPayment(paymentProfileIdentifier, paymentRequestPayload)
          }
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
