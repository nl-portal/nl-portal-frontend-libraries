import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import { Paragraph } from "@gemeente-denhaag/components-react";

const FormPage = ({ forms }) => {
  const { id } = useParams();
  return (
    <PageGrid>
      {forms.includes(id) && (
        <PageHeader title={<FormattedMessage id={`forms.${id}`} />} />
      )}
      {!forms.includes(id) && (
        <PageHeader title={<FormattedMessage  id="form.noForms" />} />
      )}
    </PageGrid>
);
};

export default FormPage;
