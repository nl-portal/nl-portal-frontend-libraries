import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../contexts/RouterOutletContext";
import { TaakSoort, TaakV2 } from "@nl-portal/nl-portal-api";

const useTaskUrl = (task: TaakV2) => {
  const { paths } = useOutletContext<RouterOutletContext>();
  if (task.soort === TaakSoort.Url) return task.url?.uri;
  return paths.task(task.id);
};

export default useTaskUrl;
