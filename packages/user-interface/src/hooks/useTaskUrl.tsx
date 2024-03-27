import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../contexts/RouterOutletContext";

const useTaskUrl = (formType: string, formValue: string, taskId: string) => {
  const { paths } = useOutletContext<RouterOutletContext>();
  if (formType === "externalurl") return formValue;
  return paths.task(taskId);
};

export default useTaskUrl;
