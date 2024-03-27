import { useState } from "react";
import { Form } from "@formio/react";
import merge from "lodash.merge";
import {
  useSubmitTaskMutation,
  useGetTaakByIdQuery,
  useGetFormDefinitionByIdLazyQuery,
  useGetFormDefinitionByObjectenApiUrlLazyQuery,
  TaakStatus,
} from "@nl-portal/nl-portal-api";
// TODO: Formio need this old version (4.7) of awesome font
import "font-awesome/css/font-awesome.min.css";
import { Alert } from "@gemeente-denhaag/components-react";
import { useIntl } from "react-intl";
import "./TaskPage.module.scss";
import { useParams } from "react-router-dom";
import BackLink, { BackLinkProps } from "../components/BackLink";
import ProtectedEval from "@formio/protected-eval";
import { Formio } from "formiojs";
import { useApolloClient } from "@apollo/client";

Formio.use(ProtectedEval);

interface TaskPageProps {
  backlink?: BackLinkProps;
}

const TaskPage = ({ backlink = {} }: TaskPageProps) => {
  const { id } = useParams();
  const intl = useIntl();
  const client = useApolloClient();
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submission, setSubmission] = useState({
    data: {},
  });

  const [submitTask] = useSubmitTaskMutation({
    onCompleted: () => {
      setSubmitted(true);
      client.cache.reset();
    },
  });
  useGetTaakByIdQuery({
    variables: { id },
    onCompleted(task) {
      if (!task) return;

      if (task.getTaakById?.status !== TaakStatus.Open) {
        setSubmitted(true);
        setLoading(false);
        return;
      }

      transformPrefilledDataToFormioSubmission(task.getTaakById.data);

      if (task.getTaakById.formulier.formuliertype === "portalid") {
        getFormById({ variables: { id: task.getTaakById.formulier.value } });
        return;
      }

      if (task.getTaakById.formulier.formuliertype === "objecturl") {
        getFormByUrl({ variables: { url: task.getTaakById.formulier.value } });
        return;
      }

      setLoading(false);
    },
  });
  const [getFormById, { data: formDefinitionId }] =
    useGetFormDefinitionByIdLazyQuery({
      onCompleted: () => setLoading(false),
    });
  const [getFormByUrl, { data: formDefinitionUrl }] =
    useGetFormDefinitionByObjectenApiUrlLazyQuery({
      onCompleted: () => setLoading(false),
    });

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const transformPrefilledDataToFormioSubmission = (submissionData: any) => {
    const keys = Object.keys(submissionData);
    let prefillData: any = {};
    const arrayPrefilledData: any = [];
    keys.forEach((key) => {
      prefillData = key
        .split(".")
        .reverse()
        .reduce((a, v, i) => {
          if (i === 0) {
            return { ...a, [v]: submissionData[key] };
          }
          return { [v]: a };
        }, {});

      arrayPrefilledData.push(prefillData);
    });
    let payload = {};
    arrayPrefilledData.forEach((item: any) => {
      payload = merge(payload, item);
    });

    setSubmission((prevSubmission) => ({ ...prevSubmission, data: payload }));
  };

  const setFormSubmission = (formioSubmission: any) => {
    setSubmission({
      ...formioSubmission,
      data: { ...formioSubmission.data, ...submission.data },
    });
  };

  const onFormSubmit = async (formioSubmission: any) => {
    if (formioSubmission?.state === "submitted") {
      await submitTask({
        variables: {
          id,
          submission: formioSubmission.data,
        },
      });
    }
  };
  /* eslint-enable @typescript-eslint/no-explicit-any */

  if (loading) {
    return null;
  }

  if (submitted) {
    return (
      <Alert
        variant="success"
        title={intl.formatMessage({ id: "task.completeTitle" })}
        text={intl.formatMessage({ id: "task.completeDescription" })}
      />
    );
  }

  if (!formDefinitionId && !formDefinitionUrl) {
    return (
      <Alert
        variant="error"
        title={intl.formatMessage({ id: "task.fetchError" })}
        text=""
      />
    );
  }

  return (
    <>
      {backlink && <BackLink {...backlink} />}
      <div className="bootstrap">
        <Form
          form={
            formDefinitionId?.getFormDefinitionById?.formDefinition ||
            formDefinitionUrl?.getFormDefinitionByObjectenApiUrl?.formDefinition
          }
          //eslint-disable-next-line @typescript-eslint/no-explicit-any
          formReady={(form: any) => {
            form.triggerRedraw();
          }} // TODO: here because customConditional don't work, update FormIO
          submission={submission}
          onChange={setFormSubmission}
          onSubmit={onFormSubmit}
          options={{ noAlerts: true }}
        />
      </div>
    </>
  );
};

export default TaskPage;
