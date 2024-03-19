import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import { Forms } from "../interfaces/forms";
import { Form } from "@formio/react";

const FormPage = ({ forms }: Forms) => {
  const { id } = useParams<{ id: string }>();
  const safeId = id || "";
  return (
    <PageGrid>
      <PageHeader title={(forms && forms.length > 0 && forms.includes(safeId)) ? (
        <span data-testid={`form-${safeId}`}>
          <FormattedMessage id={`forms.${safeId}`} />
          <Form form={{
            "display": "form",
            "components": [
              {
                "label": "Label",
                "applyMaskOn": "change",
                "tableView": true,
                "key": "field",
                "type": "textfield",
                "input": true
              },
              {
                "type": "button",
                "label": "Submit",
                "key": "submit",
                "disableOnInvalid": true,
                "input": true,
                "tableView": false
              }
            ]
          }} onSubmit={console.log} />
        </span>
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
