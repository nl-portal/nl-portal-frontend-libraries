import { TaakV2 } from "@nl-portal/nl-portal-api";
import PortalLink from "./PortalLink";
import { ActionMulti, ActionSingle } from "@gemeente-denhaag/action";
import useTaskUrl from "../hooks/useTaskUrl";
import useActionLabels from "../hooks/useActionLabels";
import { ButtonLink } from "@gemeente-denhaag/button-link";
import { ChevronRightIcon } from "@gemeente-denhaag/icons";

interface Props {
  task: TaakV2;
}

const Task = ({ task }: Props) => {
  const labels = useActionLabels();
  const { soort, value } = task.formtaak?.formulier ?? {};
  const taskUrl = useTaskUrl(soort, value, task.id);

  if (task.soort === "url")
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
        {task.titel}
      </ActionMulti>
    );

  return (
    <ActionSingle
      relativeDate
      labels={labels}
      dateTime={task.verloopdatum}
      link={taskUrl ?? ""}
      Link={PortalLink}
    >
      {task.titel}
    </ActionSingle>
  );
};

export default Task;
