import { useIntl } from "react-intl";
import BackLink from "../components/BackLink";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import { useParams } from "react-router";
import { GetOpenProductDocument, GetOpenProductQuery, GetOpenProductQueryVariables, useQuery } from "@nl-portal/nl-portal-api";

interface Props {
  slug: string;
  titleTranslationId?: string;
  children?:
    | ((
        openProduct: ReturnType<typeof useQuery<GetOpenProductQuery, GetOpenProductQueryVariables>>,
      ) => React.ReactNode)
    | React.ReactNode;
}

const ThemeHistoryPage = ({
  slug,
  titleTranslationId = `pageTitles.${slug}History`,
  children,
}: Props) => {
  const intl = useIntl();
  const params = useParams<{ id: string }>();
  const openProduct = useQuery(GetOpenProductDocument, {
    variables: { id: params.id },
  });

  return (
    <PageGrid>
      <div>
        <BackLink />
        <PageHeader title={intl.formatMessage({ id: titleTranslationId })} />
      </div>
      {children instanceof Function ? children(openProduct) : children}
    </PageGrid>
  );
};

export default ThemeHistoryPage;
