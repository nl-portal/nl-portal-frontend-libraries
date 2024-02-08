import { FormattedMessage } from "react-intl";
import styles from "./TasksList.module.scss";
import { Paragraph } from "@gemeente-denhaag/typography";
import Skeleton from "./Skeleton";
import { GetTakenQuery } from "@nl-portal/nl-portal-api";
import Task from "./Task";

interface Props {
  loading: boolean;
  error: boolean;
  tasks?: GetTakenQuery["getTaken"]["content"];
}

const TasksList = ({ loading, error, tasks }: Props) => {
  if (loading) {
    return (
      <div className={styles["tasks-list"]}>
        <Skeleton className={styles["tasks-list__skeleton"]} height={220} />
        <Skeleton className={styles["tasks-list__skeleton"]} height={220} />
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
    <section className={styles["tasks-list"]}>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </section>
  );
};

export default TasksList;
