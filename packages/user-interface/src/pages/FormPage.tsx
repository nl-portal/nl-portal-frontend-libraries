import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";

const FormPage = ({ forms }) => {
  const { id } = useParams();
  return (
    <PageGrid>
      <PageHeader title={
        forms.includes(id) && (
          <FormattedMessage id={`forms.${id}`} />
        ) || !forms.includes(id) && (
          <FormattedMessage id="form.noForms" />
        )
      } />
    </PageGrid>
  );
};

export default FormPage;
