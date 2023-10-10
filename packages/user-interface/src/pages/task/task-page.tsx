import * as React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useEffect, useState} from 'react';
// @ts-ignore
import {Form} from '@formio/react';
import {Helmet} from 'react-helmet-async';
import {useQuery} from '../../hooks';
import './task-page.css';
import _ from 'lodash';
import {
  useSubmitTaskMutation,
  useGetFormDefinitionByIdLazyQuery,
  useGetTaakByIdQuery,
} from '@nl-portal/nl-portal-api';
import {Paragraph} from "@gemeente-denhaag/components-react";
import {FormattedMessage} from "react-intl";
import styles from "../case/case-page.module.scss";

const TaskPage = () => {
  const query = useQuery();
  const taskId = query.get('id')!;
  const formId = query.get('formulier')!;

  const [submission, setSubmission] = useState({
    data: {},
  });
  const [mutateFunction, {loading: loadingSubmitTask, error: errorSubmitTask}] =
    useSubmitTaskMutation();
  const [mutating, setMutationStatus] = useState(false);
  const history = useHistory();

  const [loadFormById, {loading, data}] = useGetFormDefinitionByIdLazyQuery({
    variables: {id: formId},
  });

  const {data: taskData, error} = useGetTaakByIdQuery({variables: {id: taskId}});

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

  const getTaskData = () => {
    if (taskData) {
      // only load form by id if task can be found
      loadFormById();
      transformPrefilledDataToFormioSubmission(taskData);
    }
  };

  const navigateToTasksPage = (): void => {
    history.push(`/taken/`);
  };

  useEffect(() => {
    getTaskData();
  }, []);

  useEffect(() => {
    if (mutating && !loadingSubmitTask) {
      if (!errorSubmitTask) {
        navigateToTasksPage();
      }
      setMutationStatus(false);
    }
  }, [loadingSubmitTask]);

  const completeTask = (submissionData: any) => {
    setMutationStatus(true);
    mutateFunction({
      variables: {
        id: `${taskId}`,
        submission: submissionData,
      },
    });
  };

  const setFormSubmission = (formioSubmission: any) => {
    if (_.isEqual(formioSubmission.data, submission.data)) {
      // eslint-disable-next-line no-param-reassign
      formioSubmission.data = {...formioSubmission.data, ...submission.data};
      setSubmission(formioSubmission);
    }
  };

  const onFormSubmit = (formioSubmission: any) => {
    if (formioSubmission?.state === 'submitted') {
      completeTask(formioSubmission.data);
    }
  };

  const redrawForm = (form: any) => {
    form.triggerRedraw();
  };

  const removeLocalStorage = () => {
    localStorage.removeItem(formId);
  };

  const getSubmittedMessage = () => (
    <React.Fragment>
      <h2 className="utrecht-heading-2 utrecht-heading-2--distanced pb-1">Taak is afgerond</h2>
      <Link
        onClick={removeLocalStorage}
        className="btn btn-primary"
        role="button"
        rel="noopener noreferrer"
        to="/taken"
      >
        Klik hier om terug te gaan naar je openstaande taken
      </Link>
    </React.Fragment>
  );

  return (
      <section className={styles.case}>
        {!error ? (
          <React.Fragment>
            <Helmet>
              <link
                rel="stylesheet"
                href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
              />
              <link
                rel="stylesheet"
                href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
              />
              <link rel="stylesheet" href="https://cdn.form.io/formiojs/formio.full.min.css" />
              <script src="https://cdn.form.io/formiojs/formio.full.min.js" />
            </Helmet>
            {!loading ? (
              <Form
                form={data?.getFormDefinitionById?.formDefinition}
                formReady={redrawForm}
                submission={submission}
                onChange={setFormSubmission}
                onSubmit={onFormSubmit}
              />
            ) : (
              getSubmittedMessage()
            )}
          </React.Fragment> ) : (<Paragraph>
              <FormattedMessage id="task.unAuthorized" />
            </Paragraph>
          )}
    </section>
  );
};

export {TaskPage};
