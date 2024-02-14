import { FormattedMessage } from "react-intl";
import styles from "./TasksList.module.scss";
import { Heading3, Paragraph } from "@gemeente-denhaag/typography";
import Skeleton from "./Skeleton";
import { GetTakenQuery } from "@nl-portal/nl-portal-api";
import Task from "./Task";
import Link from "@gemeente-denhaag/link";
import PortalLink from "./PortalLink";

interface Props {
  loading?: boolean;
  error?: boolean;
  title?: string;
  tasks?: GetTakenQuery["getTaken"]["content"];
  total?: number;
}

const TasksList = ({ loading, error, title, tasks, total }: Props) => {
  if (loading) {
    return (
      <section className={styles["tasks-list"]}>
        <header className={styles["tasks-list__header"]}>
          {title && <Heading3>{title}</Heading3>}
        </header>
        <Skeleton height={60} />
        <Skeleton height={60} />
        <Skeleton height={60} />
      </section>
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
      {title && (
        <header className={styles["tasks-list__header"]}>
          <Heading3>{title}</Heading3>
          {total && (
            <Link href="/taken" Link={PortalLink}>
              <FormattedMessage id="tasks.viewAll" values={{ total }} />
            </Link>
          )}
        </header>
      )}
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </section>
  );
};

export default TasksList;
