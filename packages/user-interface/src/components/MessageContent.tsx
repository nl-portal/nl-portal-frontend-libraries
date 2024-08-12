import styles from "./MessageContent.module.scss";
import { Paragraph } from "@gemeente-denhaag/typography";
import Skeleton from "./Skeleton.tsx";
import { FormattedMessage } from "react-intl";

interface Props {
  loading?: boolean;
  error?: boolean;
  messageText?: string;
}

const MessageContent = ({ loading, error, messageText }: Props) => {
  if (loading) {
    return (
      <div>
        <Skeleton height={120} />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Paragraph>
          <FormattedMessage id="message.fetchError" />
        </Paragraph>
      </div>
    );
  }

  if (!messageText) {
    return null;
  }

  return (
    <div className={styles["message-content"]}>
      <Paragraph>{messageText}</Paragraph>
    </div>
  );
};

export default MessageContent;
