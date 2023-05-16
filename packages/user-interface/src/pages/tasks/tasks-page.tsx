import * as React from 'react';
import {Fragment, useEffect} from 'react';
import {Card, Heading2, Paragraph} from '@gemeente-denhaag/components-react';
import {FormattedMessage, useIntl} from 'react-intl';
import Skeleton from 'react-loading-skeleton';
import {useGetTasksQuery} from '@nl-portal/nl-portal-api';
import {useHistory} from 'react-router-dom';
import styles from './tasks-page.module.scss';

const TasksPage = () => {
  const intl = useIntl();
  const {data, loading, error, refetch} = useGetTasksQuery();
  const history = useHistory();
  const getTaskUrl = (formulierId: string, verwerkerTaakId: string) =>
    `?formulier=${formulierId}&id=${verwerkerTaakId}`;

  const getTaskCards = () =>
    data?.getTasks?.content?.map(task => (
      <div className={styles.tasks__card} key={task.id}>
        <Card
          variant="basic"
          title={task.title}
          date={new Date(task.date)}
          onClick={() =>
            history.push({
              pathname: '/taken/taak',
              search: getTaskUrl(task.formId, task.id),
              state: task,
            })
          }
        />
      </div>
    )) || [];

  const getNoDataMessage = () => (
    <Paragraph>
      <FormattedMessage id="tasks.noOpenTasks" />
    </Paragraph>
  );

  const getErrorMessage = () => (
    <Paragraph>
      <FormattedMessage id="tasks.fetchError" />
    </Paragraph>
  );

  const getContent = () => {
    const cards = getTaskCards();
    if (error) {
      return getErrorMessage();
    }
    return cards.length > 0 ? cards : getNoDataMessage();
  };

  const getSkeleton = () => {
    const getSkeletonCard = (key: number) => (
      <div
        className={styles.tasks__card}
        key={key}
        aria-busy
        aria-disabled
        aria-label={intl.formatMessage({id: 'element.loading'})}
      >
        <Skeleton height={220} />
      </div>
    );

    return (
      <Fragment>
        {getSkeletonCard(0)}
        {getSkeletonCard(1)}
      </Fragment>
    );
  };

  useEffect(() => {
    refetch();
  }, []);

  return (
    <React.Fragment>
      <section className={styles.tasks}>
        <header className={styles.tasks__header}>
          <Heading2>
            <FormattedMessage id="pageTitles.tasks" />
          </Heading2>
        </header>
        <div className={styles.tasks__cards}>{loading ? getSkeleton() : getContent()}</div>
      </section>
    </React.Fragment>
  );
};

export {TasksPage};
