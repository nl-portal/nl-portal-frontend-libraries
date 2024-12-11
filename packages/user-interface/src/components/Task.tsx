import { TaakSoort, TaakV2 } from "@nl-portal/nl-portal-api";
import PortalLink from "./PortalLink";
import { ActionMulti, ActionSingle } from "@gemeente-denhaag/action";
import useTaskUrl from "../hooks/useTaskUrl";
import { ButtonLink } from "@gemeente-denhaag/button-link";
import { ChevronRightIcon } from "@gemeente-denhaag/icons";
import useOgonePayment from "../hooks/useOgonePayment";
import { Button } from "@gemeente-denhaag/button";
import { useLinkClickHandler } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import {
  LocaleContext,
  useActionLabels,
} from "@nl-portal/nl-portal-localization";
import { useContext } from "react";

interface Props {
  task: TaakV2;
  openInContext?: boolean;
}

const Task = ({ task, openInContext }: Props) => {
  const labels = useActionLabels();
  const { currentLocale } = useContext(LocaleContext);
  const { startPayment, renderPaymentRedirectForm, loading } =
    useOgonePayment();
  const taskUrl = useTaskUrl(task, openInContext) ?? "";
  const handleClick = useLinkClickHandler(taskUrl);

  if (openInContext && task.koppeling) {
    return (
      <ActionSingle
        relativeDate
        labels={labels}
        dateTime={task.verloopdatum}
        locale={currentLocale}
        link={taskUrl}
        Link={PortalLink}
      >
        {task.titel}
      </ActionSingle>
    );
  }

  const createActions = () => {
    switch (task.soort) {
      case TaakSoort.Portaalformulier: {
        return (
          <ButtonLink href={taskUrl} onClick={handleClick}>
            <FormattedMessage id="task.portaalformulier.button" />
          </ButtonLink>
        );
      }
      case TaakSoort.Url: {
        return (
          <ButtonLink href={taskUrl} target="_blank">
            <ChevronRightIcon />
          </ButtonLink>
        );
      }
      case TaakSoort.Ogonebetaling:
        if (task.ogonebetaling) {
          const paymentRequestPayload = {
            amount: task.ogonebetaling.bedrag,
            orderId: task.id,
            reference: task.ogonebetaling.betaalkenmerk,
            pspId: task.ogonebetaling.pspid,
            title: task.titel,
          };

          return (
            <Button
              onClick={() => startPayment(paymentRequestPayload)}
              disabled={loading}
            >
              <FormattedMessage id="task.ogonebetaling.button" />
              {renderPaymentRedirectForm()}
            </Button>
          );
        }
    }
  };

  return (
    <ActionMulti
      relativeDate
      labels={labels}
      dateTime={task.verloopdatum}
      locale={currentLocale}
      actions={createActions()}
    >
      {task.titel}
    </ActionMulti>
  );
};

export default Task;
