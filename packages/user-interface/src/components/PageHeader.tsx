import { Heading2, Heading3, Paragraph } from "@gemeente-denhaag/typography";
import styles from "./PageHeader.module.scss";
import Skeleton from "./Skeleton";

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
      {title && <Heading2>{title}</Heading2>}
      {subTitle && <Heading3>{subTitle}</Heading3>}
      {children && <Paragraph>{children}</Paragraph>}
    </header>
  );
};

export default PageHeader;
