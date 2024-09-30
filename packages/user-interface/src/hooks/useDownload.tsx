import { KeycloakContext } from "@nl-portal/nl-portal-authentication";
import { useContext } from "react";

const useDownload = (link: string, title?: string | null) => {
  const { keycloakToken } = useContext(KeycloakContext);

  const onClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    const result = await fetch(link, {
      headers: { Authorization: `Bearer ${keycloakToken}` },
    });
    const blob = await result.blob();
    const href = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");

    anchor.href = href;
    anchor.download = title || "";
    document.body.appendChild(anchor);
    anchor.dispatchEvent(
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      }),
    );
    anchor.remove();
    window.URL.revokeObjectURL(anchor.href);
  };

  return { onClick };
};

export default useDownload;