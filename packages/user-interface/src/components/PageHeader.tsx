import styles from "./PageHeader.module.scss";
import Skeleton from "./Skeleton";
import Heading from "./Heading";
import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContext";
import { pageHeaderHeight, pageHeaderWidth } from "../constants/skeleton";

interface Props {
  loading?: boolean;
  title?: string | React.ReactNode;
  subTitle?: string | React.ReactNode;
  children?: React.ReactNode;
}

const PageHeader = ({ loading, title, subTitle, children }: Props) => {
  const { getNotifications } = useContext(NotificationContext);
  if (loading)
    return <Skeleton height={pageHeaderHeight} width={pageHeaderWidth} />;
  if (!title && !children) return null;

  return (
    <header className={styles["page-header"]}>
      {title && <Heading size="h2">{title}</Heading>}
      {subTitle && <Heading as="h3">{subTitle}</Heading>}
      {getNotifications()}
      {children}
    </header>
  );
};

export default PageHeader;
