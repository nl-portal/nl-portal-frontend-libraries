import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../contexts/RouterOutletContext";

const useTaskUrl = (soort?: string, formValue?: string, taskId?: string) => {
  const { paths } = useOutletContext<RouterOutletContext>();
  if (soort === "url") return formValue;
  return paths.task(taskId);
};

export default useTaskUrl;
