import { Taak } from "@nl-portal/nl-portal-api";
import PortalLink from "./PortalLink";
import useTaskUrl from "../hooks/useTaskUrl";
import { Action } from "@gemeente-denhaag/action";
import useActionLabels from "../hooks/useActionLabels";

interface Props {
  task: Taak;
}

const Task = ({ task }: Props) => {
  const labels = useActionLabels();
  const { formuliertype, value } = task.formulier ?? {};
  const taskUrl = useTaskUrl(formuliertype, value, task.id);

  return (
    <Action labels={labels} link={taskUrl} Link={PortalLink}>
      {task.title}
    </Action>
  );
};

export default Task;
