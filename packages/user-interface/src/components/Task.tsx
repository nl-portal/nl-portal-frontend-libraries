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

// TODO: move to custom hook with more logic
const registerPayment = async (queryParams: URLSearchParams) => {
  const response = await fetch(
    `http://localhost:8090/api/payment/ogone/postsale?${queryParams.toString()}`,
  );
  console.log(response);
  const data = await response.text();
  console.log(data);
  return null;
};

const Task = ({ task }: Props) => {
  const labels = useActionLabels();
  const { formuliertype, value } = task.formulier ?? {};
  const taskUrl = useTaskUrl(formuliertype, value, task.id);
  const { startPayment, renderPaymentRedirectForm, showPaymentRedirectForm } =
    useOgonePayment();

  if (showPaymentRedirectForm) {
    return renderPaymentRedirectForm();
  }

  // TODO register payment in development
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const isSuccessful = queryParams.get("success");

  console.log(type, isSuccessful);
  if (type === "ogone" && isSuccessful) {
    queryParams.delete("type");
    queryParams.delete("success");
    console.log("url", queryParams.toString());
    registerPayment(queryParams);
  }

  const testingPayment = true;

  if (testingPayment) {
    const paymentRequestPayload = {
      amount: 100.25,
      orderId: "17021072517-10",
      reference: "12345",
      pspId: "TAX",
      title: "Belastingzaken",
      langId: "nl_NL",
      successUrl: "https://localhost:3000/taken?type=ogone&success=true",
      failureUrl: "https://localhost:3000/taken?type=ogone",
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
