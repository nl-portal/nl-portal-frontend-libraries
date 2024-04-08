import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import { Forms } from "../interfaces/forms";
import { Form } from "@formio/react";
import { useGetFormDefinitionByNameQuery } from "@nl-portal/nl-portal-api";

const FormPage = ({ forms }: Forms) => {
  const { name } = useParams<{ name: string }>();
  const safeName: string = name || "";
  const {
    data,
    loading,
    error
  } = useGetFormDefinitionByNameQuery({
    variables: {
      name: safeName
    },
  });
  console.log(data, loading, error);

  const onFormSubmit = async (formioSubmission: any) => {
    if (formioSubmission?.state === "submitted") {
      console.log(formioSubmission);
      alert('submitted');
    }
  };

  return (
    <PageGrid>
      <PageHeader title={(forms && forms.length > 0 && !error && forms.includes(safeName)) ? (
        <span data-testid={`form-${safeName}`}>
          <FormattedMessage id={`forms.${safeName}`} />
        </span>
      ) : (
        <span data-testid={`form-not-found`}>
          <FormattedMessage id="form.notFound" />
        </span>
      )
      } />
      {(data?.getFormDefinitionByName?.formDefinition ? (
        <div className="bootstrap">
          <Form form={data?.getFormDefinitionByName?.formDefinition}
                onSubmit={onFormSubmit}
                options={{ noAlerts: true }}
          />
        </div>
      ) : (
        <span data-testid={`form-not-found`}>
          <FormattedMessage id="form.notFound" />
        </span>
      ))}
    </PageGrid>
  );
};

export default FormPage;
