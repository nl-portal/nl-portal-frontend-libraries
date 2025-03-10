import styles from "./MessageContent.module.scss";
import { Paragraph } from "@gemeente-denhaag/typography";
import Skeleton from "./Skeleton";
import { FormattedMessage } from "react-intl";
import { parseLinks } from "../utils/parse-links";
import { messageContentHeight } from "../constants/skeleton";

interface Props {
  loading?: boolean;
  error?: boolean;
  messageText?: string;
}

const MessageContent = ({ loading, error, messageText }: Props) => {
  if (loading) {
    return (
      <div>
        <Skeleton height={messageContentHeight} />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Paragraph>
          <FormattedMessage id="messageContent.fetchError" />
        </Paragraph>
      </div>
    );
  }

  if (!messageText) {
    return (
      <div>
        <Paragraph>
          <FormattedMessage id="messageContent.fetchError" />
        </Paragraph>
      </div>
    );
  }

  return (
    <div className={styles["message-content"]}>
      <Paragraph>{parseLinks(messageText)}</Paragraph>
    </div>
  );
};

export default MessageContent;
