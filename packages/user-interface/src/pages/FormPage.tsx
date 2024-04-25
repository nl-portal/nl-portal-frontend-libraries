import PageGrid from "../components/PageGrid";
import PageHeader from "../components/PageHeader";
import { FormattedMessage, useIntl } from "react-intl";
import { useParams } from "react-router-dom";
import { Form } from "@formio/react";
import {
  useSaveStartFormToObjectsApiMutation,
  useGetFormDefinitionByNameQuery,
} from "@nl-portal/nl-portal-api";
import { useApolloClient } from "@apollo/client";
import { useState } from "react";
import { Alert } from "@gemeente-denhaag/components-react";

const FormPage = () => {
  const { name } = useParams<{ name: string }>();
  const safeName: string = name || "";
  const intl = useIntl();
  const client = useApolloClient();
  const [submitted, setSubmitted] = useState(false);
  const { data, loading } = useGetFormDefinitionByNameQuery({
    variables: {
      name: safeName,
    },
  });

  const [submitStartForm] = useSaveStartFormToObjectsApiMutation({
    onCompleted: () => {
      setSubmitted(true);
      client.cache.reset();
    },
  });

  const onFormSubmit = async (formioSubmission: {
    metadata: object;
    state: string;
    data: object;
  }) => {
    if (formioSubmission?.state === "submitted") {
      await submitStartForm({
        variables: {
          submission: formioSubmission.data,
          name: safeName,
        },
      });
    }
  };

  if (loading) {
    return null;
  }

  if (submitted) {
    return (
      <Alert
        variant="success"
        title={intl.formatMessage(
          { id: "start-form.completeTitle" },
          { name: safeName },
        )}
        text={intl.formatMessage(
          { id: "start-form.completeDescription" },
          { name: safeName },
        )}
      />
    );
  }

  return (
    <PageGrid>
      <PageHeader
        title={
          data?.getFormDefinitionByName?.formDefinition?.components ? (
            <span data-testid={`form-title`}>
              <FormattedMessage id={`forms.${safeName}`} />
            </span>
          ) : (
            <span data-testid={`form-not-found-title`}>
              <FormattedMessage id="form.notFound" />
            </span>
          )
        }
      />
      {data?.getFormDefinitionByName?.formDefinition?.components ? (
        <div className="bootstrap" data-testid={`form-rendered`}>
          <Form
            form={data?.getFormDefinitionByName?.formDefinition}
            onSubmit={onFormSubmit}
            options={{ noAlerts: true }}
          />
        </div>
      ) : (
        <span data-testid={`form-not-found`}>
          <FormattedMessage id="form.notFound" />
        </span>
      )}
    </PageGrid>
  );
};

export default FormPage;
