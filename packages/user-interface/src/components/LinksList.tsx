import { useIntl } from "react-intl";
import Skeleton from "./Skeleton";
import SectionHeader from "./SectionHeader";
import { ActionSingle } from "@gemeente-denhaag/action";
import useActionLabels from "../hooks/useActionLabels";
import PortalLink from "./PortalLink";

interface Props {
  loading?: boolean;
  showTitle?: boolean;
  titleTranslationId?: string;
  links: { title: string; href: string }[];
}

const LinksList = ({
  loading,
  showTitle = true,
  titleTranslationId = "linksList.title",
  links,
}: Props) => {
  const intl = useIntl();
  const labels = useActionLabels();
  const title = showTitle
    ? intl.formatMessage({ id: titleTranslationId })
    : undefined;

  if (loading) {
    return (
      <section>
        <SectionHeader title={title} />
        <Skeleton height={60} />
        <Skeleton height={60} />
        <Skeleton height={60} />
      </section>
    );
  }

  return (
    <section>
      <SectionHeader title={title} />
      {links.map((link) => (
        <ActionSingle labels={labels} link={link.href} Link={PortalLink}>
          {link.title}
        </ActionSingle>
      ))}
    </section>
  );
};

export default LinksList;
