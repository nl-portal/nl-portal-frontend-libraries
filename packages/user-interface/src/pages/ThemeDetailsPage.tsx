import { useIntl } from "react-intl";
import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";

interface Props {
  type: string;
}

const ThemeDetailsPage = ({ type }: Props) => {
  const intl = useIntl();

  return (
    <PageGrid>
      <PageHeader title={intl.formatMessage({ id: `pageTitles.${type}` })} />
    </PageGrid>
  );
};

export default ThemeDetailsPage;
