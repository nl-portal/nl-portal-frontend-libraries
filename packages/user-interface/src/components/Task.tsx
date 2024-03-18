import { GetTakenQuery } from "@nl-portal/nl-portal-api";
import PortalLink from "./PortalLink";
import { getTaskUrl } from "../utils/get-task-url";
import { ActionMulti, ActionSingle } from "@gemeente-denhaag/action";
import useActionLabels from "../hooks/useActionLabels";
import { ButtonLink } from "@gemeente-denhaag/button-link";
import { ChevronRightIcon } from "@gemeente-denhaag/icons";

interface Props {
  task: GetTakenQuery["getTaken"]["content"][0];
}

const Task = ({ task }: Props) => {
  const labels = useActionLabels();
  const link = getTaskUrl(
    task.formulier.formuliertype,
    task.formulier.value,
    task.id,
  );

  if (task.formulier.formuliertype === "externalurl")
    return (
      <ActionMulti
        labels={labels}
        dateTime={task.verloopdatum}
        actions={
          <ButtonLink href={link} target="_blank">
            <ChevronRightIcon />
          </ButtonLink>
        }
      >
        {task.title}
      </ActionMulti>
    );

  return (
    <ActionSingle
      labels={labels}
      dateTime={task.verloopdatum}
      link={link}
      Link={PortalLink}
    >
      {task.title}
    </ActionSingle>
  );
};

export default Task;
