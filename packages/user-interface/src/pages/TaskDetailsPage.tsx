import { useState } from "react";
import ProtectedEval from "@formio/protected-eval";
import { Formio } from "@formio/js";
import { Form } from "@formio/react";
import { merge } from "lodash-es";
import {
  useSubmitTaakV2Mutation,
  useGetFormDefinitionByObjectenApiUrlLazyQuery,
  TaakStatus,
  useGetFormDefinitionByIdLazyQuery,
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

      if (task.getTaakByIdV2.portaalformulier.formulier.soort === "url") {
        getFormByUrl({
          variables: {
            url: task.getTaakByIdV2.portaalformulier?.formulier.value,
          },
        });
        return;
      }

      if (task.getTaakByIdV2.portaalformulier.formulier.soort === "id") {
        getFormById({
          variables: {
            id: task.getTaakByIdV2.portaalformulier?.formulier.value,
          },
        });
        return;
      }

      setLoading(false);
    },
  });

  const [getFormByUrl, { data: formDefinitionUrl }] =
    useGetFormDefinitionByObjectenApiUrlLazyQuery({
      onCompleted: () => setLoading(false),
    });

  const [getFormById, { data: formDefinitionId }] =
    useGetFormDefinitionByIdLazyQuery({
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
      await submitTaak({
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

  if (!formDefinitionUrl && !formDefinitionId) {
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

  /* eslint-disable @typescript-eslint/no-explicit-any */
  // Replace FormIO choices.js select with html5 native select
  const applyNativeSelectsToForm = (form: any) => {
    const walk = (components: any[]) => {
      for (const c of components) {
        if (c.type === "select") {
          c.widget = "html5";
        }
        if (Array.isArray(c.components)) walk(c.components);
        if (Array.isArray(c.columns))
          c.columns.forEach((col: any) => walk(col.components));
        if (Array.isArray(c.rows))
          c.rows.forEach((row: any) =>
            row.forEach((cell: any) => walk(cell.components || [])),
          );
      }
    };

    walk(form.components || []);
    return form;
  };
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const rawForm =
    formDefinitionUrl?.getFormDefinitionByObjectenApiUrl?.formDefinition ||
    formDefinitionId?.getFormDefinitionById?.formDefinition;

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
          options={{
            noAlerts: true,
            template: "nl-portal",
          }}
        />
      </div>
    </PageGrid>
  );
};

export default TaskDetailsPage;
