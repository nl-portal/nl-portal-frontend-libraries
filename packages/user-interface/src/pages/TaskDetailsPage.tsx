import { useEffect, useMemo } from "react";
import { Form } from "@formio/react";
import { merge } from "lodash-es";
import {
  SubmitTaakV2Document,
  GetFormDefinitionByTaskIdDocument,
  TaakStatus,
  GetPortaalFormulierByIdV2Document,
} from "@nl-portal/nl-portal-api";
import { useMutation, useLazyQuery, useQuery } from "@apollo/client/react";
import { Alert } from "@gemeente-denhaag/alert";
import { useIntl } from "react-intl";
import styles from "./TaskDetailsPage.module.scss";
import { useParams } from "react-router";
import { BackLink } from "../components/BackLink";
import { Paragraph } from "@gemeente-denhaag/typography";
import PageHeader from "../components/PageHeader";
import PageGrid from "../components/PageGrid";
import Skeleton from "../components/Skeleton";
import {
  applyNativeSelectsToForm,
  convertPortalFileUploadResult,
} from "../components/formio/FormIoTemplateUtils";

/* eslint-disable @typescript-eslint/no-explicit-any */
const buildPrefillPayload = (submissionData: any) => {
  if (submissionData == null) return {};

  const keys = Object.keys(submissionData);
  const arrayPrefilledData: any[] = [];

  keys.forEach((key) => {
    const prefillData = key
      .split(".")
      .reverse()
      .reduce((a, v, i) => {
        if (i === 0) return { ...a, [v]: submissionData[key] };
        return { [v]: a };
      }, {});

    arrayPrefilledData.push(prefillData);
  });

  return arrayPrefilledData.reduce((acc, item) => merge(acc, item), {});
};
/* eslint-enable @typescript-eslint/no-explicit-any */

const TaskDetailsPage = () => {
  const { id } = useParams();
  const intl = useIntl();

  const [submitTaak] = useMutation(SubmitTaakV2Document, {
    update: (cache, { data }) => {
      const updated = data?.submitTaakV2;
      if (!updated) return;

      cache.modify({
        id: cache.identify(updated),
        fields: {
          status() {
            return updated.status;
          },
        },
      });
    },
  });

  const { data: task, loading: taskLoading } = useQuery(
    GetPortaalFormulierByIdV2Document,
    {
      variables: { id },
    },
  );

  const [
    getFormByTaskId,
    { data: formDefinition, loading: formByTaskIdLoading },
  ] = useLazyQuery(GetFormDefinitionByTaskIdDocument);
  const submitted = task?.getTaakByIdV2?.status !== TaakStatus.Open;
  const loading = taskLoading || formByTaskIdLoading;

  const { submission, prefillError } = useMemo(() => {
    try {
      const data = buildPrefillPayload(
        task?.getTaakByIdV2?.portaalformulier?.data,
      );
      return { submission: { data }, prefillError: false };
    } catch (err) {
      console.error(err);
      return { submission: { data: {} }, prefillError: true };
    }
  }, [task]);

  useEffect(() => {
    if (!task?.getTaakByIdV2?.portaalformulier) return;
    if (task?.getTaakByIdV2?.status !== TaakStatus.Open) return;

    getFormByTaskId({ variables: { taskId: id } });
  }, [task, getFormByTaskId, id]);

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const onFormSubmit = async (formioSubmission: any) => {
    if (formioSubmission?.state === "submitted") {
      const transformedData = convertPortalFileUploadResult(
        formioSubmission.data,
      );

      await submitTaak({
        variables: {
          id,
          submission: transformedData,
        },
      });
    }
  };
  /* eslint-enable @typescript-eslint/no-explicit-any */

  if (loading) {
    return (
      <PageGrid variant="medium">
        <PageHeader loading title={task?.getTaakByIdV2?.titel} />
        <div className={styles["task-details-page"]}>
          <Skeleton width="100%" height={56} />
        </div>
      </PageGrid>
    );
  }

  if (prefillError) {
    return (
      <>
        <BackLink />
        <Alert
          variant="error"
          title={intl.formatMessage({ id: "taskDetails.errorTitle" })}
          text={intl.formatMessage({ id: "taskDetails.errorDescription" })}
        />
      </>
    );
  }

  if (submitted) {
    return (
      <>
        <BackLink />
        <Alert
          variant="success"
          title={intl.formatMessage({ id: "taskDetails.completeTitle" })}
          text={
            <Paragraph>
              {intl.formatMessage({ id: "taskDetails.completeDescription" })}
            </Paragraph>
          }
        />
      </>
    );
  }

  const rawForm = formDefinition?.getFormDefinitionByTaskId?.formDefinition;

  if (!rawForm) {
    return (
      <>
        <BackLink />
        <Alert
          variant="error"
          title={intl.formatMessage({ id: "taskDetails.fetchError" })}
          text=""
        />
      </>
    );
  }

  const adjustedForm = applyNativeSelectsToForm(structuredClone(rawForm));

  return (
    <PageGrid variant="medium">
      <div>
        <BackLink />
        <PageHeader title={task?.getTaakByIdV2?.titel} />
      </div>
      <div className={styles["task-details-page"]}>
        <Form
          src={adjustedForm}
          submission={submission}
          onSubmit={onFormSubmit}
          options={
            {
              noAlerts: true,
              template: "nl-portal",
              taakId: id,
            } as Record<string, unknown>
          }
        />
      </div>
    </PageGrid>
  );
};

export default TaskDetailsPage;
