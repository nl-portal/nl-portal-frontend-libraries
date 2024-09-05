import PortalLink from "./PortalLink";
import { ActionSingle } from "@gemeente-denhaag/action";
import useActionLabels from "../hooks/useActionLabels";
import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../contexts/RouterOutletContext";
import { FormattedMessage } from "react-intl";
import { StatusBadge } from "@gemeente-denhaag/status-badge";
import styles from "./Message.module.scss";
import { Bericht } from "@nl-portal/nl-portal-api";

interface Props {
  message: Bericht;
}

const Message = ({ message }: Props) => {
  const labels = useActionLabels();
  const { paths } = useOutletContext<RouterOutletContext>();

  return (
    <ActionSingle
      labels={labels}
      dateTime={message.publicatiedatum}
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
