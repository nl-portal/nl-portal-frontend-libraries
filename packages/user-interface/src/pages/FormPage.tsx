import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import { Forms } from "../interfaces/forms";

const FormPage = ({ forms }: Forms) => {
  const { id } = useParams<{ id: string }>();
  const safeId = id || "";
  return (
    <PageGrid>
      <PageHeader title={(forms && forms.length > 0 && forms.includes(safeId)) ? (
          <FormattedMessage id={`forms.${safeId}`} />
        ) : (
          <span data-testid={`form-not-found`}>
            <FormattedMessage id="form.notFound" />
          </span>
        )
      } />
    </PageGrid>
  );
};

export default FormPage;
