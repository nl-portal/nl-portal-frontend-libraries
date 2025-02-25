import { useIntl } from "react-intl";
import Skeleton from "./Skeleton";
import SectionHeader from "./SectionHeader";
import Link, { LinkProps } from "@gemeente-denhaag/link";
import LinkListComponent, { LinkListItem } from "@gemeente-denhaag/link-list";
import PortalLink from "./PortalLink";
import { listViewHeight } from "../constants/skeleton";

interface Props {
  loading?: boolean;
  titleTranslationId?: string | null;
  links?: LinkProps[];
}

const LinkList = ({
  loading,
  titleTranslationId = "linkList.title",
  links,
}: Props) => {
  const intl = useIntl();
  const title = titleTranslationId
    ? intl.formatMessage({ id: titleTranslationId })
    : undefined;

  if (loading) {
    return (
      <section>
        <SectionHeader title={title} />
        <Skeleton height={listViewHeight} />
        <Skeleton height={listViewHeight} />
        <Skeleton height={listViewHeight} />
      </section>
    );
  }

  if (!links || links.length === 0) {
    return null;
  }

  return (
    <section>
      <SectionHeader title={title} />
      <LinkListComponent>
        {links.map((link, index) => (
          <LinkListItem key={index}>
            <Link {...link} Link={PortalLink} />
          </LinkListItem>
        ))}
      </LinkListComponent>
    </section>
  );
};

export default LinkList;
