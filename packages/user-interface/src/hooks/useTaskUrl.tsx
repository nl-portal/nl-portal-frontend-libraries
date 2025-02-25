import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../interfaces/router-outlet-context";
import { TaakSoort, TaakV2 } from "@nl-portal/nl-portal-api";
import { TaakKoppelingRegistratie } from "../interfaces/taak-koppeling-registratie";

const useTaskUrl = (task: TaakV2, openInContext?: boolean) => {
  const { paths } = useOutletContext<RouterOutletContext>();
  if (openInContext && task.koppeling.value) {
    if (
      task.koppeling.registratie.toUpperCase() === TaakKoppelingRegistratie.Zaak
    )
      return paths.case(task.koppeling.value);
  }
  if (task.soort === TaakSoort.Url) return task.url?.uri;
  return paths.task(task.id);
};

export default useTaskUrl;
