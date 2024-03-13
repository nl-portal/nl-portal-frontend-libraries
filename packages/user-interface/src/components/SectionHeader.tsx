import { Heading3 } from "@gemeente-denhaag/typography";
import styles from "./SectionHeader.module.scss";
import PortalLink from "./PortalLink";
import Link from "@gemeente-denhaag/link";

interface Props {
  title?: string;
  href?: string;
  subTitle?: string;
}

const SectionHeader = ({ title, href, subTitle }: Props) => {
  if (!title) return null;

  return (
    <header className={styles["section-header"]}>
      <Heading3>{title}</Heading3>
      {href && subTitle && (
        <Link href={href} Link={PortalLink}>
          {subTitle}
        </Link>
      )}
    </header>
  );
};

export default SectionHeader;
