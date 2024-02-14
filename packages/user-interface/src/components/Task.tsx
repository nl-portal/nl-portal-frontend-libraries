import { GetTakenQuery } from "@nl-portal/nl-portal-api";
import PortalLink from "./PortalLink";
import { getTaskUrl } from "../utils/get-task-url";
import { Action } from "@gemeente-denhaag/action";

const labels = {
  today: "vandaag",
  yesterday: "gisteren",
  before: "vóór",
  approachingDeadline: (daysDifference: number) => {
    if (daysDifference === 1) {
      return `nog ${daysDifference} dag`;
    }
    return `nog ${daysDifference} dagen`;
  },
};

interface Props {
  task: GetTakenQuery["getTaken"]["content"][0];
}

const Task = ({ task }: Props) => {
  return (
    <Action
      labels={labels}
      link={getTaskUrl(
        task.formulier.formuliertype,
        task.formulier.value,
        task.id,
      )}
    >
      {task.title}
    </Action>
  );
};

export default Task;
