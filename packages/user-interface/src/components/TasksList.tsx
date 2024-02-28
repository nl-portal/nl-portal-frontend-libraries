import { FormattedMessage, useIntl } from "react-intl";
import styles from "./TasksList.module.scss";
import { Paragraph } from "@gemeente-denhaag/typography";
import Skeleton from "./Skeleton";
import { GetTakenQuery } from "@nl-portal/nl-portal-api";
import Task from "./Task";
import { Pagination } from "@gemeente-denhaag/pagination";
import SectionHeader from "./SectionHeader";
import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../contexts/RouterOutletContext";

interface Props {
  loading?: boolean;
  error?: boolean;
  title?: string;
  tasks?: GetTakenQuery["getTaken"]["content"];
  total?: number;
  index?: number;
  indexLimit?: number;
  onChange?: (index: number) => number;
}

const TasksList = ({
  loading,
  error,
  title,
  tasks,
  total,
  index,
  indexLimit,
  onChange,
}: Props) => {
  const intl = useIntl();
  const { paths } = useOutletContext<RouterOutletContext>();
  const subTitle = total
    ? intl.formatMessage({ id: "tasks.viewAll" }, { total })
    : undefined;

  if (loading) {
    return (
      <section className={styles["tasks-list"]}>
        <SectionHeader title={title} />
        <Skeleton height={60} />
        <Skeleton height={60} />
        <Skeleton height={60} />
      </section>
    );
  }

  if (error)
    return (
      <section className={styles["tasks-list"]}>
        <SectionHeader title={title} />
        <Paragraph>
          <FormattedMessage id="tasks.fetchError" />
        </Paragraph>
      </section>
    );

  if (!tasks || tasks.length === 0)
    return (
      <section className={styles["tasks-list"]}>
        <SectionHeader title={title} />
        <Paragraph>
          <FormattedMessage id="tasks.noOpenTasks" />
        </Paragraph>
      </section>
    );

  return (
    <section className={styles["tasks-list"]}>
      <SectionHeader title={title} subTitle={subTitle} href={paths.tasks} />
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
      {indexLimit && (
        <Pagination
          className={`denhaag-pagination--center ${styles["tasks-list__pagination"]}`}
          index={index}
          indexLimit={indexLimit}
          onChange={onChange}
        />
      )}
    </section>
  );
};

export default TasksList;
