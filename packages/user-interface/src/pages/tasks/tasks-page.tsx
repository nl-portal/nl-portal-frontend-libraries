import * as React from 'react';
import {Fragment, useEffect} from 'react';
import {Heading2, Paragraph} from '@gemeente-denhaag/components-react';
import {SubjectCard} from '@gemeente-denhaag/card';
import {FormattedMessage, useIntl} from 'react-intl';
import Skeleton from 'react-loading-skeleton';
import {useGetTakenQuery} from '@nl-portal/nl-portal-api';
import styles from './tasks-page.module.scss';
import {PortalLink} from '../../utils';

const TasksPage = () => {
  const intl = useIntl();
  const {data, loading, error, refetch} = useGetTakenQuery();
  const getTaskUrl = (formType: string, formValue: string, verwerkerTaakId: string) => {
    if (formType === 'id') {
      return `/taken/taak?formulier=${formValue}&id=${verwerkerTaakId}`;
    } else {
      return formValue;
    }
  };

  const getTaskCards = () =>
    data?.getTaken?.content?.map(task => (
      <div className={styles.tasks__card} key={task.id}>
        <SubjectCard
          title={task.title}
          date={new Date(task.date)}
          href={getTaskUrl(task.formulier.type, task.formulier.value, task.id)}
          Link={PortalLink}
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
