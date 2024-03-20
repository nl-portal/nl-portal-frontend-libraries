import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../contexts/RouterOutletContext";

export const getTaskUrl = (
  formType: string,
  formValue: string,
  taakId: string,
) => {
  const { paths } = useOutletContext<RouterOutletContext>();
  if (formType === "externalurl") return formValue;
  return paths.task(taakId);
};
