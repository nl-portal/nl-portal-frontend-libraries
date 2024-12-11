import { useIntl } from "react-intl";
import BackLink from "../components/BackLink";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";

interface Props {
  slug: string;
  titleTranslationId?: string;
  children?: React.ReactNode;
}

const ThemeSubPage = ({
  slug,
  titleTranslationId = `pageTitles.${slug}`,
  children,
}: Props) => {
  const intl = useIntl();

  return (
    <PageGrid>
      <div>
        <BackLink />
        <PageHeader title={intl.formatMessage({ id: titleTranslationId })} />
      </div>
      {children}
    </PageGrid>
  );
};

export default ThemeSubPage;
