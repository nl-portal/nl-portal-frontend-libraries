import { KeycloakContext } from "@nl-portal/nl-portal-authentication";
import { useContext } from "react";

const useDownload = (link: string, title?: string | null) => {
  const { keycloakToken } = useContext(KeycloakContext);

  const onClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    const response = await fetch(link, {
      headers: { Authorization: `Bearer ${keycloakToken}` },
    });

    if (!response.ok) return console.log("Failed to download file");

    const blob = await response.blob();
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
