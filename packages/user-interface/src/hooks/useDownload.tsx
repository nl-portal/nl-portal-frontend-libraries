import { KeycloakContext } from "@nl-portal/nl-portal-authentication";
import { useContext, useState } from "react";

const useDownload = (href: string, filename?: string) => {
  const { keycloakToken } = useContext(KeycloakContext);
  const [loading, setLoading] = useState(false);

  const onClick = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setLoading(true);

    const response = await fetch(href, {
      headers: { Authorization: `Bearer ${keycloakToken}` },
    });

    setLoading(false);

    if (!response.ok) return console.error("Failed to download file");

    const responseHeader = response.headers.get("Content-Disposition");
    const headerFilename = responseHeader
      ?.split(";")
      ?.find((n) => n.includes("filename="))
      ?.replace("filename=", "")
      ?.replace(/"/g, "")
      .trim();
    const blob = await response.blob();
    const blobHref = window.URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    const download = filename || headerFilename;

    if (!download) return console.error("Failed to download file, no filename");

    anchor.href = blobHref;
    anchor.download = download;
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

  return { onClick, loading };
};

export default useDownload;
