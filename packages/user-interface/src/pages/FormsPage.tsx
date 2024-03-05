import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import { FormattedMessage } from "react-intl";

const FormsPage = () => {
  return (
    <PageGrid>
      <PageHeader title={<FormattedMessage id="pageTitles.forms" />} />
    </PageGrid>
  );
};

export default FormsPage;
