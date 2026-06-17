import { useState } from "react";
import ProtectedEval from "@formio/protected-eval";
import { Formio } from "@formio/js";
import { Form } from "@formio/react";
import { merge } from "lodash-es";
import {
  useSubmitTaakV2Mutation,
  useGetFormDefinitionByTaskIdLazyQuery,
  TaakStatus,
  useGetPortaalFormulierByIdV2Query,
  GetPortaalFormulierByIdV2Document,
} from "@nl-portal/nl-portal-api";
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

//eslint-disable-next-line react-hooks/rules-of-hooks
Formio.use(ProtectedEval);

const TaskDetailsPage = () => {
  const { id } = useParams();
  const intl = useIntl();
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);
  const [submission, setSubmission] = useState({
    data: {},
  });

  const [submitTaak] = useSubmitTaakV2Mutation({
    update: (cache, { data }) => {
      cache.writeQuery({
        query: GetPortaalFormulierByIdV2Document,
        data: {
          getTaakByIdV2: {
            ...data?.submitTaakV2,
          },
        },
      });
    },
    onCompleted: () => {
      setSubmitted(true);
    },
  });

  const { data: task } = useGetPortaalFormulierByIdV2Query({
    variables: { id },
    onCompleted(task) {
      if (!task || !task.getTaakByIdV2 || !task.getTaakByIdV2.portaalformulier)
        return;

      if (task.getTaakByIdV2?.status !== TaakStatus.Open) {
        setSubmitted(true);
        setLoading(false);
        return;
      }

      try {
        transformPrefilledDataToFormioSubmission(
          task.getTaakByIdV2.portaalformulier.data,
        );
      } catch (err) {
        console.error(err);
        setError(true);
      }

      getFormByTaskId({ variables: { taskId: id } });
    },
  });

  const [getFormByTaskId, { data: formDefinition }] =
    useGetFormDefinitionByTaskIdLazyQuery({
      onCompleted: () => setLoading(false),
    });

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const transformPrefilledDataToFormioSubmission = (submissionData: any) => {
    if (submissionData === null) return null;
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
          <Skeleton width="100%" height={56} count={4} />
        </div>
      </PageGrid>
    );
  }

  if (error) {
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

  if (!formDefinition) {
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

  const rawForm = formDefinition?.getFormDefinitionByTaskId?.formDefinition;

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
