import styles from "./SectionHeader.module.scss";
import PortalLink from "./PortalLink";
import Link from "@gemeente-denhaag/link";
import classnames from "classnames";
import { ArrowRightIcon } from "@gemeente-denhaag/icons";
import Heading from "./Heading";

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
      {small ? (
        <Heading as="h4">{title}</Heading>
      ) : (
        <Heading as="h3">{title}</Heading>
      )}
      {href && subTitle && (
        <Link
          className={styles["section-header__link"]}
          href={href}
          Link={PortalLink}
          icon={<ArrowRightIcon />}
        >
          {subTitle}
        </Link>
      )}
    </header>
  );
};

export default SectionHeader;
