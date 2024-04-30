import { DescriptionList as DescriptionListComponent } from "@gemeente-denhaag/descriptionlist";
import SectionHeader from "./SectionHeader";
import { useIntl } from "react-intl";
import Skeleton from "./Skeleton";
import { Paragraph } from "@gemeente-denhaag/typography";

interface Props {
  loading?: boolean;
  error?: boolean;
  errorTranslationId?: string;
  emptyTranslationId?: string;
  titleTranslationId?: string | null;
  items: {
    title: React.ReactNode;
    detail: React.ReactNode;
  }[];
}

const DescriptionList = ({
  loading,
  error,
  errorTranslationId = "descriptionList.fetchError",
  emptyTranslationId = "descriptionList.empty",
  titleTranslationId = "descriptionList.title",
  items,
}: Props) => {
  const intl = useIntl();
  const errorMessage = intl.formatMessage({ id: errorTranslationId });
  const emptyMessage = intl.formatMessage({ id: emptyTranslationId });
  const title = titleTranslationId
    ? intl.formatMessage({ id: titleTranslationId })
    : undefined;

  if (loading) {
    return (
      <section>
        <SectionHeader title={title} />
        <div>
          <Skeleton height={60} />
          <Skeleton height={60} />
          <Skeleton height={60} />
        </div>
      </section>
    );
  }

  if (error)
    return (
      <section>
        <SectionHeader title={title} />
        <Paragraph>{errorMessage}</Paragraph>
      </section>
    );

  if (!items || items.length === 0)
    return (
      <section>
        <SectionHeader title={title} />
        <Paragraph>{emptyMessage}</Paragraph>
      </section>
    );

  return (
    <section>
      <SectionHeader title={title} />
      <DescriptionListComponent items={items} />
    </section>
  );
};

export default DescriptionList;
