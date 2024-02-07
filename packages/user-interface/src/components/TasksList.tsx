import { SubjectCard } from "@gemeente-denhaag/card";
import { FormattedMessage } from "react-intl";
import styles from "./TasksList.module.scss";
import { getTaskUrl } from "../utils/get-task-url";
import PortalLink from "./PortalLink";
import { Paragraph } from "@gemeente-denhaag/typography";
import Skeleton from "./Skeleton";
import { GetTakenQuery } from "@nl-portal/nl-portal-api";

interface Props {
  loading: boolean;
  error: boolean;
  tasks?: GetTakenQuery["getTaken"]["content"];
}

const TasksList = ({ loading, error, tasks }: Props) => {
  if (loading) {
    return (
      <div className={styles.tasks__cards}>
        <Skeleton className={styles.tasks__card} height={220} />
        <Skeleton className={styles.tasks__card} height={220} />
      </div>
    );
  }

  if (error)
    return (
      <Paragraph>
        <FormattedMessage id="tasks.fetchError" />
      </Paragraph>
    );

  if (!tasks || tasks.length === 0)
    return (
      <Paragraph>
        <FormattedMessage id="tasks.noOpenTasks" />
      </Paragraph>
    );

  return (
    <section className={styles.tasks__cards}>
      {tasks.map((task) => (
        <div className={styles.tasks__card} key={task.id}>
          <SubjectCard
            title={task.title}
            date={new Date(task.date)}
            Link={PortalLink}
            href={getTaskUrl(
              task.formulier.formuliertype,
              task.formulier.value,
              task.id,
            )}
          />
        </div>
      ))}
    </section>
  );
};

export default TasksList;
