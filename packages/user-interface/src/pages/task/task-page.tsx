import * as React from 'react';
import {useEffect, useState} from 'react';
// @ts-ignore - Formio is not typed, fixed in version 5.3.*, RC now available
import {Form} from '@formio/react';
import {Helmet} from 'react-helmet-async';
import './task-page.css';
import _ from 'lodash';
import {
  useSubmitTaskMutation,
  useGetTaakByIdQuery,
  useGetFormDefinitionByIdQuery,
} from '@nl-portal/nl-portal-api';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useQuery} from '../../hooks';

const TaskPage = () => {
  const query = useQuery();
  const taskId = query.get('id')!;
  const formId = query.get('formulier')!;
  const [submitted, setSubmitted] = useState(false);
  const [submission, setSubmission] = useState({
    data: {},
  });

  const [submitTask] = useSubmitTaskMutation();
  const {data: taskData, loading: loadingTask} = useGetTaakByIdQuery({variables: {id: taskId}});
  const {data: formDefinition, loading: loadingFormDefinition} = useGetFormDefinitionByIdQuery({
    variables: {id: formId},
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
    if (!taskData) return;
    transformPrefilledDataToFormioSubmission(taskData);
  }, [taskData]);

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

  if (loadingTask || loadingFormDefinition) {
    return null;
  }

  if (submitted) {
    <React.Fragment>Submit</React.Fragment>;
  }

  return (
    <React.Fragment>
      <Helmet>
        {/* TODO: Do we still need this? */}
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Helmet>
      <Form
        form={formDefinition?.getFormDefinitionById?.formDefinition}
        submission={submission}
        onChange={setFormSubmission}
        onSubmit={onFormSubmit}
        onSubmitDone={() => setSubmitted(true)}
        options={{noAlerts: true}}
      />
    </React.Fragment>
  );
};

export {TaskPage};
