import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../interfaces/router-outlet-context";

import {
  TaakKoppelingRegistratie,
  TaakSoort,
  TaakV2,
} from "@nl-portal/nl-portal-api";

const useTaskUrl = (task: TaakV2, openInContext?: boolean) => {
  const { paths } = useOutletContext<RouterOutletContext>();
  if (openInContext && task.koppeling) {
    if (task.koppeling.registratie === TaakKoppelingRegistratie.Zaak)
      return paths.case(task.koppeling.uuid);
  }
  if (task.soort === TaakSoort.Url) return task.url?.uri;
  return paths.task(task.id);
};

export default useTaskUrl;
