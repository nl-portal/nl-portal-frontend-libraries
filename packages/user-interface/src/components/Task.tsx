import { Taak } from "@nl-portal/nl-portal-api";
import PortalLink from "./PortalLink";
import { ActionMulti, ActionSingle } from "@gemeente-denhaag/action";
import useTaskUrl from "../hooks/useTaskUrl";
import useActionLabels from "../hooks/useActionLabels";
import { ButtonLink } from "@gemeente-denhaag/button-link";
import { ChevronRightIcon } from "@gemeente-denhaag/icons";

interface Props {
  task: Taak;
}

const Task = ({ task }: Props) => {
  const labels = useActionLabels();
  const { formuliertype, value } = task.formulier ?? {};
  const taskUrl = useTaskUrl(formuliertype, value, task.id);

  if (task.formulier.formuliertype === "externalurl")
    return (
      <ActionMulti
        relativeDate
        labels={labels}
        dateTime={task.verloopdatum}
        actions={
          <ButtonLink href={taskUrl} target="_blank">
            <ChevronRightIcon />
          </ButtonLink>
        }
      >
        {task.title}
      </ActionMulti>
    );

  return (
    <ActionSingle
      relativeDate
      labels={labels}
      dateTime={task.verloopdatum}
      link={taskUrl}
      Link={PortalLink}
    >
      {task.title}
    </ActionSingle>
  );
};

export default Task;
