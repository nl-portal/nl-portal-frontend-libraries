import { useState } from "react";
import { Form } from "@formio/react";
import merge from "lodash.merge";
import {
  useSubmitTaakV2Mutation,
  useGetFormDefinitionByObjectenApiUrlLazyQuery,
  TaakStatus,
  useGetFormDefinitionByIdLazyQuery,
  TaakVersion,
  useGetFormTaakByIdV2Query,
  GetFormTaakByIdV2Document,
} from "@nl-portal/nl-portal-api";
// TODO: Formio need this old version (4.7) of awesome font
import "font-awesome/css/font-awesome.min.css";
import { Alert } from "@gemeente-denhaag/components-react";
import { useIntl } from "react-intl";
import styles from "./TaskPage.module.scss";
import { useParams } from "react-router-dom";
import BackLink, { BackLinkProps } from "../components/BackLink";
import ProtectedEval from "@formio/protected-eval";
import { Formio } from "formiojs";

Formio.use(ProtectedEval);

interface TaskPageProps {
  backlink?: BackLinkProps;
}

const TaskPage = ({ backlink = {} }: TaskPageProps) => {
  const { id } = useParams();
  const intl = useIntl();
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submission, setSubmission] = useState({
    data: {},
  });
  const [taakVersion, setTaakVersion] = useState(TaakVersion.V2);

  const [submitTaak] = useSubmitTaakV2Mutation({
    update: (cache, { data }) => {
      cache.writeQuery({
        query: GetFormTaakByIdV2Document,
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
  useGetFormTaakByIdV2Query({
    variables: { id },
    onCompleted(task) {
      if (
        !task ||
        !task.getTaakByIdV2 ||
        !task.getTaakByIdV2.formtaak ||
        !task.getTaakByIdV2.version
      )
        return;

      if (task.getTaakByIdV2?.status !== TaakStatus.Open) {
        setSubmitted(true);
        setLoading(false);
        return;
      }

      setTaakVersion(task.getTaakByIdV2.version);

      transformPrefilledDataToFormioSubmission(
        task.getTaakByIdV2.formtaak.data,
      );

      if (task.getTaakByIdV2.formtaak.formulier.soort === "url") {
        getFormByUrl({
          variables: { url: task.getTaakByIdV2.formtaak?.formulier.value },
        });
        return;
      }

      if (task.getTaakByIdV2.formtaak.formulier.soort === "id") {
        getFormById({
          variables: { id: task.getTaakByIdV2.formtaak?.formulier.value },
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
      await submitTaak({
        variables: {
          id,
          submission: formioSubmission.data,
          version: taakVersion,
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
      <>
        {backlink && <BackLink {...backlink} />}
        <Alert
          variant="success"
          title={intl.formatMessage({ id: "task.completeTitle" })}
          text={intl.formatMessage({ id: "task.completeDescription" })}
        />
      </>
    );
  }

  if (!formDefinitionUrl && !formDefinitionId) {
    console.log(formDefinitionUrl);
    return (
      <>
        {backlink && <BackLink {...backlink} />}
        <Alert
          variant="error"
          title={intl.formatMessage({ id: "task.fetchError" })}
          text=""
        />
      </>
    );
  }

  return (
    <>
      {backlink && <BackLink {...backlink} />}
      <div className={styles.bootstrap}>
        <Form
          form={
            formDefinitionUrl?.getFormDefinitionByObjectenApiUrl
              ?.formDefinition ||
            formDefinitionId?.getFormDefinitionById?.formDefinition
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
