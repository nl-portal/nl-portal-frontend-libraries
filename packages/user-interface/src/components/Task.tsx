import { GetTakenQuery } from "@nl-portal/nl-portal-api";
import PortalLink from "./PortalLink";
import useTaskUrl from "../hooks/useTaskUrl";
import { Action } from "@gemeente-denhaag/action";
import useActionLabels from "../hooks/useActionLabels";

interface Props {
  task: GetTakenQuery["getTaken"]["content"][0];
}

const Task = ({ task }: Props) => {
  const labels = useActionLabels();
  const taskUrl = useTaskUrl(
    task.formulier.formuliertype,
    task.formulier.value,
    task.id,
  );

  return (
    <Action labels={labels} link={taskUrl} Link={PortalLink}>
      {task.title}
    </Action>
  );
};

export default Task;
