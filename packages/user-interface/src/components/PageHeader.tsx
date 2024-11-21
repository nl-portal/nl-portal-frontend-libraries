import styles from "./PageHeader.module.scss";
import Skeleton from "./Skeleton";
import Heading from "./Heading";
import useNotification from "../hooks/useNotification";

interface Props {
  loading?: boolean;
  title?: string | React.ReactNode;
  subTitle?: string | React.ReactNode;
  children?: React.ReactNode;
}

const PageHeader = ({ loading, title, subTitle, children }: Props) => {
  const { getNotifications } = useNotification();
  if (loading) return <Skeleton height={40} width={250} />;
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
