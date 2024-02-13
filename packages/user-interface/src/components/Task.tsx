import { GetTakenQuery } from "@nl-portal/nl-portal-api";
import { SubjectCard } from "@gemeente-denhaag/card";
import PortalLink from "./PortalLink";
import styles from "./Task.module.scss";
import { getTaskUrl } from "../utils/get-task-url";

interface Props {
  task: GetTakenQuery["getTaken"]["content"][0];
}

const Task = ({ task }: Props) => {
  return (
    <div className={styles.task}>
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
  );
};

export default Task;
