import { Paragraph } from "@gemeente-denhaag/typography";
import styles from "./PageHeader.module.scss";
import Skeleton from "./Skeleton";
import Heading from "./Heading";

interface Props {
  loading?: boolean;
  title?: string | React.ReactNode;
  subTitle?: string | React.ReactNode;
  children?: React.ReactNode;
}

const PageHeader = ({ loading, title, subTitle, children }: Props) => {
  if (loading) return <Skeleton height={40} width={250} />;
  if (!title && !children) return null;

  return (
    <header className={styles["page-header"]}>
      {title && <Heading size="h2">{title}</Heading>}
      {subTitle && <Heading as="h3">{subTitle}</Heading>}
      {children && <Paragraph>{children}</Paragraph>}
    </header>
  );
};

export default PageHeader;
