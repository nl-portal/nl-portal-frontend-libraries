import * as React from 'react';
import {useEffect, useState} from 'react';
// @ts-ignore - Formio is not typed, fixed in version 5.3.*, RC now available
import {Form} from '@formio/react';
import './task-page.css';
import _ from 'lodash';
import {
  useSubmitTaskMutation,
  useGetTaakByIdQuery,
  useGetFormDefinitionByIdLazyQuery,
  useGetFormDefinitionByObjectenApiUrlLazyQuery,
} from '@nl-portal/nl-portal-api';
import 'bootstrap/dist/css/bootstrap.min.css';
// TODO: Formio need this old version (4.7) of awesome font
import 'font-awesome/css/font-awesome.min.css';
import {Alert} from '@gemeente-denhaag/components-react';
import {useIntl} from 'react-intl';
import {useQuery} from '../../hooks';

export const TaskPage = () => {
  const query = useQuery();
  const intl = useIntl();
  const taskId = query.get('id');
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submission, setSubmission] = useState({
    data: {},
  });

  const [submitTask] = useSubmitTaskMutation();
  const {data: task} = useGetTaakByIdQuery({variables: {id: taskId}});
  const [getFormById, {data: formDefinitionId}] = useGetFormDefinitionByIdLazyQuery({
    onCompleted: () => setLoading(false),
  });
  const [getFormByUrl, {data: formDefinitionUrl}] = useGetFormDefinitionByObjectenApiUrlLazyQuery({
    onCompleted: () => setLoading(false),
  });

  const transformPrefilledDataToFormioSubmission = (submissionData: any) => {
    const keys = Object.keys(submissionData);
    let prefillData: any = {};
    const arrayPrefilledData: any = [];
    keys.forEach(key => {
      prefillData = key
        .split('.')
        .reverse()
        .reduce((a, v, i) => {
          if (i === 0) {
            return {...a, [v]: submissionData[key]};
          }
          return {[v]: a};
        }, {});

      arrayPrefilledData.push(prefillData);
    });
    let payload = {};
    arrayPrefilledData.forEach((item: any) => {
      payload = _.merge(payload, item);
    });

    submission.data = payload;
    setSubmission(submission);
  };

  useEffect(() => {
    if (!task) return;
    transformPrefilledDataToFormioSubmission(task);

    if (task.getTaakById.formulier.formuliertype === 'portalid') {
      getFormById({variables: {id: task.getTaakById.formulier.value}});
      return;
    }

    if (task.getTaakById.formulier.formuliertype === 'objecturl') {
      getFormByUrl({variables: {url: task.getTaakById.formulier.value}});
      return;
    }

    setLoading(false);
  }, [task]);

  const setFormSubmission = (formioSubmission: any) => {
    if (_.isEqual(formioSubmission.data, submission.data)) {
      // eslint-disable-next-line no-param-reassign
      formioSubmission.data = {...formioSubmission.data, ...submission.data};
      setSubmission(formioSubmission);
    }
  };

  const onFormSubmit = async (formioSubmission: any) => {
    if (formioSubmission?.state === 'submitted') {
      await submitTask({
        variables: {
          id: `${taskId}`,
          submission: formioSubmission.data,
        },
      });
    }
  };

  if (loading) {
    return null;
  }

  if (!formDefinitionId && !formDefinitionUrl) {
    return <Alert variant="error" title={intl.formatMessage({id: 'task.fetchError'})} text="" />;
  }

  if (submitted) {
    return (
      <Alert
        variant="success"
        title={intl.formatMessage({id: 'task.completeTitle'})}
        text={intl.formatMessage({id: 'task.completeDescription'})}
      />
    );
  }

  return (
    <React.Fragment>
      <Form
        form={
          formDefinitionId?.getFormDefinitionById?.formDefinition ||
          formDefinitionUrl?.getFormDefinitionByObjectenApiUrl?.formDefinition
        }
        submission={submission}
        onChange={setFormSubmission}
        onSubmit={onFormSubmit}
        onSubmitDone={() => setSubmitted(true)}
        options={{noAlerts: true}}
      />
    </React.Fragment>
  );
};
