import styles from "./MessageContent.module.scss";
import { Paragraph } from "@gemeente-denhaag/typography";

interface Props {
  messageText: string;
}

const MessageContent = ({ messageText }: Props) => {
  return (
    <div className={styles["message-content"]}>
      <Paragraph>{messageText}</Paragraph>
    </div>
  );
};

export default MessageContent;
