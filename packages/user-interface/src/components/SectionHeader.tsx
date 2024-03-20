import { Heading3, Heading4 } from "@gemeente-denhaag/typography";
import styles from "./SectionHeader.module.scss";
import PortalLink from "./PortalLink";
import Link from "@gemeente-denhaag/link";
import classnames from "classnames";

interface Props {
  title?: string;
  small?: boolean;
  href?: string;
  subTitle?: string;
}

const SectionHeader = ({ title, small, href, subTitle }: Props) => {
  if (!title) return null;

  return (
    <header
      className={classnames(styles["section-header"], {
        [styles["section-header--small"]]: small,
      })}
    >
      {small ? <Heading4>{title}</Heading4> : <Heading3>{title}</Heading3>}
      {href && subTitle && (
        <Link href={href} Link={PortalLink}>
          {subTitle}
        </Link>
      )}
    </header>
  );
};

export default SectionHeader;
