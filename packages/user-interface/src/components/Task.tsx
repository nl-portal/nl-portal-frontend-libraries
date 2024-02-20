import { GetTakenQuery } from "@nl-portal/nl-portal-api";
import PortalLink from "./PortalLink";
import { getTaskUrl } from "../utils/get-task-url";
import { Action } from "@gemeente-denhaag/action";
import useActionLabels from "../hooks/useActionLabels";

interface Props {
  task: GetTakenQuery["getTaken"]["content"][0];
}

const Task = ({ task }: Props) => {
  const labels = useActionLabels();

  return (
    <Action
      labels={labels}
      link={getTaskUrl(
        task.formulier.formuliertype,
        task.formulier.value,
        task.id,
      )}
      Link={PortalLink}
    >
      {task.title}
    </Action>
  );
};

export default Task;
