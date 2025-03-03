import PortalLink from "./PortalLink";
import { ActionSingle } from "@gemeente-denhaag/action";
import { useOutletContext } from "react-router";
import { RouterOutletContext } from "../interfaces/router-outlet-context";
import { FormattedMessage } from "react-intl";
import { StatusBadge } from "@gemeente-denhaag/status-badge";
import styles from "./Message.module.scss";
import { Bericht } from "@nl-portal/nl-portal-api";
import { useContext } from "react";
import {
  LocaleContext,
  useActionLabels,
} from "@nl-portal/nl-portal-localization";

interface Props {
  message: Bericht;
}

const Message = ({ message }: Props) => {
  const labels = useActionLabels();
  const { paths } = useOutletContext<RouterOutletContext>();
  const { currentLocale } = useContext(LocaleContext);

  return (
    <ActionSingle
      labels={labels}
      dateTime={message.publicatiedatum}
      locale={currentLocale}
      link={paths.message(message.id)}
      Link={PortalLink}
    >
      {message.geopend ? (
        message.onderwerp
      ) : (
        <>
          <StatusBadge className={styles["message__badge"]}>
            <FormattedMessage id="messagesList.new" />
          </StatusBadge>
          <b>{message.onderwerp}</b>
        </>
      )}
    </ActionSingle>
  );
};

export default Message;
