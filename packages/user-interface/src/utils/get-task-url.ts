import { useOutletContext } from "react-router-dom";
import { RouterOutletContext } from "../contexts/RouterOutletContext";

export const getTaskUrl = (
  formType: string,
  formValue: string,
  taakId: string,
) => {
  if (formType === "externalurl") return formValue;
  const { paths } = useOutletContext<RouterOutletContext>();
  return paths.task(taakId);
};
