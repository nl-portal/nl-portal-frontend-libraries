import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import { Paragraph } from "@gemeente-denhaag/components-react";

const FormPage = ({ forms }) => {
  const { id } = useParams();
  return (
    <PageGrid>
      <PageHeader title={<FormattedMessage id={`forms.${id}`} />} />
      {forms.includes(id) && (
        <Paragraph>
          <FormattedMessage id="pageTitles.form" />
        </Paragraph>
      )}
      {!forms.includes(id) && (
        <Paragraph>
          <FormattedMessage id="form.noForms" />
        </Paragraph>
      )}
    </PageGrid>
);
};

export default FormPage;
