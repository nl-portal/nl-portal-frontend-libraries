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
          <span data-testid={`form-item-${form}`}>
            <FormattedMessage id={`forms.${id}`} />
          </span>
        ) || !forms.includes(id) && (
          <span data-testid={`form-not-found`}>
            <FormattedMessage id="form.formNotFound" />
          </span>
        )
      } />
    </PageGrid>
  );
};

export default FormPage;
