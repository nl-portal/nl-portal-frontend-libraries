import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../contexts/RouterOutletContext";
import { Taak } from "@nl-portal/nl-portal-api";

const useTaskUrl = (
  formType: string,
  formValue: string,
  task: Taak,
  openInContext?: boolean,
) => {
  const { paths } = useOutletContext<RouterOutletContext>();
  if (openInContext && task.zaak) {
    return paths.case(task.zaak.split("/").pop());
  }
  if (formType === "externalurl") return formValue;
  return paths.task(task.id);
};

export default useTaskUrl;
