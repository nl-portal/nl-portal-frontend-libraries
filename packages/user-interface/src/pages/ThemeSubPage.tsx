import { useIntl } from "react-intl";
import BackLink from "../components/BackLink";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../contexts/RouterOutletContext";

interface Props {
  type: string;
  titleTranslationId?: string;
  pageHeaderContent?: React.ReactNode;
  children?: React.ReactNode;
}

const ThemeSubPage = ({
  type,
  titleTranslationId = `pageTitles.${type}`,
  pageHeaderContent,
  children,
}: Props) => {
  const intl = useIntl();
  const { paths } = useOutletContext<RouterOutletContext>();

  return (
    <PageGrid>
      <div>
        <BackLink routePath={paths.themeOverview(type)} />
        <PageHeader title={intl.formatMessage({ id: titleTranslationId })}>
          {pageHeaderContent}
        </PageHeader>
      </div>
      {children}
    </PageGrid>
  );
};

export default ThemeSubPage;
