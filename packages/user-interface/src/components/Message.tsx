import PortalLink from "./PortalLink";
import { ActionSingle } from "@gemeente-denhaag/action";
import useActionLabels from "../hooks/useActionLabels";
import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../contexts/RouterOutletContext";
import { FormattedMessage } from "react-intl";
import { StatusBadge } from "@gemeente-denhaag/status-badge";
import styles from "./Message.module.scss";

// TODO: Replace with type from graphql
export interface MessageType {
  id: number;
  titel: string;
  verloopdatum: string;
  read: boolean;
}

interface Props {
  message: MessageType;
}

const Task = ({ message }: Props) => {
  const labels = useActionLabels();
  const { paths } = useOutletContext<RouterOutletContext>();

  return (
    <ActionSingle
      labels={labels}
      dateTime={message.verloopdatum}
      link={paths.message(message.id)}
      Link={PortalLink}
    >
      {message.read ? (
        message.titel
      ) : (
        <>
          <StatusBadge className={styles["message__badge"]}>
            <FormattedMessage id="messagesList.new" />
          </StatusBadge>
          <b>{message.titel}</b>
        </>
      )}
    </ActionSingle>
  );
};

export default Task;
