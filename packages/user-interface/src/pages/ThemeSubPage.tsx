import { useIntl } from "react-intl";
import BackLink from "../components/BackLink";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../interfaces/router-outlet-context";

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
  const { paths } = useOutletContext<RouterOutletContext>();

  return (
    <PageGrid>
      <div>
        <BackLink routePath={paths.themeOverview(slug)} />
        <PageHeader title={intl.formatMessage({ id: titleTranslationId })} />
      </div>
      {children}
    </PageGrid>
  );
};

export default ThemeSubPage;
