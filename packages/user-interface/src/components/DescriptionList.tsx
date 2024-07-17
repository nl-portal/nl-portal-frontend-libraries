import { DescriptionList as DescriptionListComponent } from "@gemeente-denhaag/descriptionlist";
import SectionHeader from "./SectionHeader";
import { useIntl } from "react-intl";
import Skeleton from "./Skeleton";
import { Paragraph } from "@gemeente-denhaag/typography";
import styles from "./DescriptionList.module.scss";

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
  children?: React.ReactNode;
}

const DescriptionList = ({
  loading,
  error,
  errorTranslationId = "descriptionList.fetchError",
  emptyTranslationId = "descriptionList.empty",
  titleTranslationId = "descriptionList.title",
  items,
  children,
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
        {children && (
          <div className={styles["description-list__children"]}>{children}</div>
        )}
      </section>
    );

  return (
    <section>
      <SectionHeader title={title} />
      <DescriptionListComponent items={items} />
      {children && (
        <div className={styles["description-list__children"]}>{children}</div>
      )}
    </section>
  );
};

export default DescriptionList;
