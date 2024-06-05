import { useIntl } from "react-intl";
import Skeleton from "./Skeleton";
import SectionHeader from "./SectionHeader";
import { ActionSingle } from "@gemeente-denhaag/action";
import useActionLabels from "../hooks/useActionLabels";
import PortalLink from "./PortalLink";
import { Paragraph } from "@gemeente-denhaag/typography";

interface Props {
  loading?: boolean;
  showEmpty?: boolean;
  emptyTranslationId?: string;
  titleTranslationId?: string | null;
  links: { title: string; href: string }[];
}

const LinksList = ({
  loading,
  showEmpty = true,
  emptyTranslationId = "linksList.empty",
  titleTranslationId = "linksList.title",
  links,
}: Props) => {
  const intl = useIntl();
  const labels = useActionLabels();
  const title = titleTranslationId
    ? intl.formatMessage({ id: titleTranslationId })
    : undefined;
  const emptyMessage = intl.formatMessage({ id: emptyTranslationId });

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

  if (!links || links.length === 0) {
    if (!showEmpty) return null;
    return (
      <section>
        <SectionHeader title={title} />
        <Paragraph>{emptyMessage}</Paragraph>
      </section>
    );
  }

  return (
    <section>
      <SectionHeader title={title} />
      {links.map((link) => (
        <ActionSingle
          key={link.title}
          labels={labels}
          link={link.href}
          Link={PortalLink}
        >
          {link.title}
        </ActionSingle>
      ))}
    </section>
  );
};

export default LinksList;
