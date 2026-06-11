import { useIntl } from "react-intl";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import { OpenProductThema } from "@nl-portal/nl-portal-api";
import { ProductFetchList } from "../components/ProductFetchList";
import { stringToSlug } from "../utils/string-to-slug";
import AppContext from "../contexts/AppContext";
import { use } from "react";
import BackLink from "../components/BackLink";
import { useOutletContext } from "react-router";
import { RouterOutletContext } from "../interfaces/router-outlet-context";
import { ProductSettings } from "../interfaces/product-types";

interface Props {
  slug: string;
  productSettings: ProductSettings;
  children?: ((theme: OpenProductThema) => React.ReactNode) | React.ReactNode;
}

const ThemeListPage = ({ slug, productSettings, children }: Props) => {
  const intl = useIntl();
  const { themes } = use(AppContext);
  const { paths } = useOutletContext<RouterOutletContext>();
  const theme = themes.find(
    (theme) => stringToSlug(theme.naam) === stringToSlug(slug),
  ) as OpenProductThema;

  return (
    <PageGrid>
      <div>
        <BackLink href={paths.themeOverview(slug)} />
        <PageHeader title={intl.formatMessage({ id: `pageTitles.${slug}` })} />
      </div>
      {
        <ProductFetchList
          key={productSettings.titleTranslationId}
          slug={slug}
          productLength={10}
          pagination={true}
          {...productSettings}
        />
      }
      {children instanceof Function ? children(theme) : children}
    </PageGrid>
  );
};

export default ThemeListPage;
