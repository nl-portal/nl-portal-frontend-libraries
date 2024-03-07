import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import { Forms } from "../interfaces/forms.ts";

const FormPage = ({ forms }: Forms) => {
  const { id } = useParams();
  return (
    <PageGrid>
      <PageHeader title={
        forms && forms.length > 0 && forms.includes(id) && (
          <span data-testid={`form-item-${id}`}>
            <FormattedMessage id={`forms.${id}`} />
          </span>
        ) || forms && forms.length > 0 && !forms.includes(id) && (
          <span data-testid={`form-not-found`}>
            <FormattedMessage id="form.formNotFound" />
          </span>
        )
      } />
    </PageGrid>
  );
};

export default FormPage;
